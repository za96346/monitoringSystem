import express from 'express';
import { createServer } from 'http';
import { body } from 'express-validator';

import EntryController from './controller/Entry';
import DeviceController from './controller/Device';
import { AppService } from 'types/AppService';

const index = ({
    port,
    appService
}: {
    port: number,
    appService?: AppService.Instance
}): void => {
    const deviceController = new DeviceController({
        deviceApp: appService.DeviceApp
    })
    const entryController = new EntryController({
        entryApp: appService.EntryApp
    })

    const app = express();

    // middle ware
    app.use(express.json())

    // 登入
    app.get('/entry/login', entryController.login.bind(entryController));

    // 裝置
    app.get('/device', deviceController.get.bind(deviceController));
    app.put(
        '/device',
        [
            body('deviceName').isString().withMessage('Name 必須是字串'),
            body('sort').isInt({ min: 0 }).withMessage('sort 必須是正整數'),
        ],
        deviceController.add.bind(deviceController)
    );
    app.post(
        '/device',
        [
            body('id').isInt({ min: 0 }).withMessage('id 必須是正整數'),
            body('deviceName').isString().withMessage('Name 必須是字串'),
            body('sort').isInt({ min: 0 }).withMessage('sort 必須是正整數'),
        ],
        deviceController.update.bind(deviceController)
    );
    app.delete(
        '/device',
        [
            body('id').isInt({ min: 1 }).withMessage('is 必須是正整數'),
        ],
        deviceController.delete.bind(deviceController)
    );
    app.get("/device/upload", deviceController.dataReceive.bind(deviceController))

    const apiServer = createServer(app);
    apiServer.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default index