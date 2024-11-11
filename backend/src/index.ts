import express from 'express';

import ApiServer from "./interface/restfulApi/index"
import WebSocketServer from "./interface/webSocket/index"

// 應用層
import DeviceApp from "./appService/DeviceApp"
import DataMonitorApp from "./appService/DataMonitorApp"
import EntryApp from "./appService/EntryApp"

// 基礎設施層
import Presistence from "./infrastructure/presistence/index"

// 領域層
import UserPo from "./domain/po/UserPo"
import DevicePo from "./domain/po/DevicePo"
import DeviceDataPo from "./domain/po/DeviceDataPo"
import DeviceDomainService from './domain/service/DeviceDomainService';

const app = express();
const presistence = Presistence({
    type: "mysql",
    logging: ['error', 'query', 'schema'],
    entities: [DevicePo, UserPo, DeviceDataPo]
})
const appServiceInstance = {
    DeviceApp: new DeviceApp({
        deviceRepo: presistence.Device,
        deviceDomainService: new DeviceDomainService()
    }),
    DataMonitorApp: new DataMonitorApp(),
    EntryApp: new EntryApp()
}

const apiPort = 3000;
const webSocketPort = 3001

ApiServer({
    app,
    port: apiPort,
    appService: appServiceInstance
})
WebSocketServer({
    port: webSocketPort,
    presistence,
    appService: appServiceInstance
})