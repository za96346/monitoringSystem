import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';
import { WebSocketServer } from 'ws';
import { parse } from 'url';

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
            const deviceDatas = await appService.DeviceDataApp.getDeviceDatasByDeviceIds(deviceIds)
            const deviceDataslength = (deviceDatas ?? []).length || 0
            if (previousDataLength !== deviceDataslength) {
                ws.send(JSON.stringify(deviceDatas))
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