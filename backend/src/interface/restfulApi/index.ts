import { Request, Response, Express } from 'express';
import { createServer } from 'http';

import EntryController from './controller/Entry';
import DeviceController from './controller/Device';
import { Repository } from 'types/Repository';

const index = ({ app, port, presistence }: { app: Express, port: number, presistence?: Repository.Instance }): void => {
    const deviceController = new DeviceController({ deviceRepo: presistence.Device })
    const entryController = new EntryController({ userRepo: presistence.User })

    // 登入
    app.get('/entry/login', entryController.login);

    // 裝置
    app.get('/device', deviceController.get);
    app.put('/device', deviceController.add);
    app.post('/device', deviceController.update);
    app.delete('/device', deviceController.delete);
    app.get("/device", deviceController.dataReceive)

    const apiServer = createServer(app);
    apiServer.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default index