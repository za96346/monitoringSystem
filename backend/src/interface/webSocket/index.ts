import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';
import { WebSocketServer } from 'ws';

const index = ({ port, presistence, appService }: {
    port: number,
    presistence?: Repository.Instance,
    appService?: AppService.Instance
}): void => {
    // 建立並啟動 WebSocket Server 在另一個埠號
    const wss = new WebSocketServer({ port });

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');

        // 接收來自客戶端的訊息
        ws.on('message', (message) => {
            console.log('Received:', message.toString());
            ws.send(`Echo: ${message}`);
        });

        // 當 WebSocket 連接關閉時
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    console.log(`WebSocket Server is running on ws://localhost:${port}`);
}

export default index