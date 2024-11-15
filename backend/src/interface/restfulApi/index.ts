import express from 'express';
import { createServer } from 'http';
import { body } from 'express-validator';
import cors from "cors"

import EntryController from './controller/Entry';
import DeviceController from './controller/Device';
import DeviceDataController from './controller/DeviceData';
import { AppService } from 'types/AppService';

// middleware
import AuthenticateToken from './middleware/AuthenticateToken';

const index = ({
    ip,
    port,
    appService,
    jwtSecretKey
}: {
    ip: string
    port: number
    jwtSecretKey: string
    appService?: AppService.Instance
}): void => {
    const authenticateToken = AuthenticateToken(jwtSecretKey)

    const deviceController = new DeviceController({
        deviceApp: appService.DeviceApp
    })
    const entryController = new EntryController({
        entryApp: appService.EntryApp
    })
    const deviceDataController = new DeviceDataController({
        deviceDataApp: appService.DeviceDataApp
    })

    const app = express();

    // middle ware
    app.use(express.json())
    app.use(cors())

    // 登入
    app.post(
        '/backendApi/entry/login',
        [
            body('account').isString().withMessage('account 必須是字串'),
            body('password').isString().withMessage('password 必須是字串'),
        ],
        entryController.login.bind(entryController)
    );

    // 裝置
    app.get('/backendApi/device', authenticateToken, deviceController.get.bind(deviceController));
    app.put(
        '/backendApi/device',
        authenticateToken,
        [
            body('deviceName').isString().withMessage('Name 必須是字串'),
            body('sort').isInt({ min: 0 }).withMessage('sort 必須是正整數'),
        ],
        deviceController.add.bind(deviceController)
    );
    app.post(
        '/backendApi/device',
        authenticateToken,
        [
            body('id').isInt({ min: 0 }).withMessage('id 必須是正整數'),
            body('deviceName').isString().withMessage('Name 必須是字串'),
            body('sort').isInt({ min: 0 }).withMessage('sort 必須是正整數'),
        ],
        deviceController.update.bind(deviceController)
    );
    app.delete(
        '/backendApi/device',
        authenticateToken,
        [
            body('id').isInt({ min: 1 }).withMessage('id 必須是正整數'),
        ],
        deviceController.delete.bind(deviceController)
    );

    // 裝置資料
    app.post(
        "/backendApi/deviceData",
        authenticateToken,
        [
            body('deviceId').isInt({ min: 1 }).withMessage('deviceId 必須是正整數'),
            body('data').isObject().withMessage('data 必須是object'),
        ],
        deviceDataController.dataReceive.bind(deviceDataController)
    )

    const apiServer = createServer(app);
    apiServer.listen(port, ip, () => {
        console.log(`Server is running at http://${ip}:${port}/backendApi`);
    });
}

export default index