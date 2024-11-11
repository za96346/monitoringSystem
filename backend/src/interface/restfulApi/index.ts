import { Express } from 'express';
import { createServer } from 'http';

import EntryController from './controller/Entry';
import DeviceController from './controller/Device';
import { AppService } from 'types/AppService';

const index = ({
    app,
    port,
    appService
}: {
    app: Express,
    port: number,
    appService?: AppService.Instance
}): void => {
    const deviceController = new DeviceController({
        deviceApp: appService.DeviceApp
    })
    const entryController = new EntryController({
        entryApp: appService.EntryApp
    })

    // 登入
    app.get('/entry/login', entryController.login.bind(entryController));

    // 裝置
    app.get('/device', deviceController.get.bind(deviceController));
    app.put('/device', deviceController.add.bind(deviceController));
    app.post('/device', deviceController.update.bind(deviceController));
    app.delete('/device', deviceController.delete.bind(deviceController));
    app.get("/device/upload", deviceController.dataReceive.bind(deviceController))

    const apiServer = createServer(app);
    apiServer.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default index