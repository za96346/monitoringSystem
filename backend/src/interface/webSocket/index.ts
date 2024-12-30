import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';
import { WebSocketServer } from 'ws';
import { parse } from 'url';
import DeviceDataEntity from '../../domain/entity/DeviceDataEntity';

const index = ({
    ip,
    port,
    presistence,
    appService
}: {
    ip: string
    port: number
    presistence?: Repository.Instance
    appService?: AppService.Instance
}): void => {
    // 建立並啟動 WebSocket Server 在另一個埠號
    const wss = new WebSocketServer({
        port,
        host: ip
    });

    wss.on('connection', (ws, request) => {
        console.log('Client connected to WebSocket');

        const queryParams = parse(request.url || '', true).query as unknown as {
            token: string
            deviceId: string
        };
        const deviceIds = queryParams.deviceId
            ?.split(",")
            ?.map((item) => parseInt(item)) ?? []
        
        let previousDataLength = 0
        console.log('Client connected with params:', queryParams);

        const interval = setInterval(async() => {
            const thirtySecondsBeforeTime = new Date()
            thirtySecondsBeforeTime.setSeconds(thirtySecondsBeforeTime.getSeconds() - 30)
            const now = new Date()

            const deviceDatas = await appService.DeviceDataApp.getDeviceDatasByDeviceIdsCreateTime({
                deviceIds,
                startTime: thirtySecondsBeforeTime,
                endTime: now
            })
            const deviceDataslength = (deviceDatas ?? []).length || 0

            // 依據裝置id整理資料
            const okData = deviceDatas.reduce((prev, curr) => {
                prev[curr.deviceId] = [
                    ...(prev?.[curr.deviceId] ?? []),
                    curr
                ]
                return prev
            }, {} as Record<number, DeviceDataEntity[]>)

            if (previousDataLength !== deviceDataslength) {
                ws.send(JSON.stringify(okData))
                previousDataLength = deviceDataslength
            }
        }, 100);

        // 接收來自客戶端的訊息
        ws.on('message', (message) => {
            console.log('Received:', message.toString());
            ws.send(`Echo: ${message}`);
        });

        // 當 WebSocket 連接關閉時
        ws.on('close', () => {
            console.log('Client disconnected');
            clearInterval(interval)
        });
    });

    console.log(`WebSocket Server is running on ws://${ip}:${port}`);
}

export default index