import { Express } from 'express';
import { createServer } from 'http';

import EntryController from './controller/Entry';
import DeviceController from './controller/Device';
import { Repository } from 'types/Repository';
import { AppService } from 'types/AppService';

const index = ({
    app,
    port,
    presistence,
    appService
}: {
    app: Express,
    port: number,
    presistence?: Repository.Instance,
    appService?: AppService.Instance
}): void => {
    const deviceController = new DeviceController({
        deviceRepo: presistence.Device,
        deviceApp: appService.DeviceApp
    })
    const entryController = new EntryController({
        userRepo: presistence.User,
        entryApp: appService.EntryApp
    })

    // 登入
    app.get('/entry/login', entryController.login);

    // 裝置
    app.get('/device', deviceController.get);
    app.put('/device', deviceController.add);
    app.post('/device', deviceController.update);
    app.delete('/device', deviceController.delete);
    app.get("/device/upload", deviceController.dataReceive)

    const apiServer = createServer(app);
    apiServer.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default index