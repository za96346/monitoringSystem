import express from 'express';

import ApiServer from "./interface/restfulApi/index"
import WebSocketServer from "./interface/webSocket/index"

// 應用層
import DeviceApp from "./appService/DeviceApp"
import DataMonitorApp from "./appService/DataMonitorApp"
import EntryApp from "./appService/EntryApp"

// 基礎設施層
import Presistence from "./infrastructure/presistence/index"

const app = express();
const presistence = Presistence()
const appServiceInstance = {
    DeviceApp: new DeviceApp(),
    DataMonitorApp: new DataMonitorApp(),
    EntryApp: new EntryApp()
}

const apiPort = 3000;
const webSocketPort = 3001

ApiServer({
    app,
    port: apiPort,
    presistence,
    appService: appServiceInstance
})
WebSocketServer({
    port: webSocketPort,
    presistence,
    appService: appServiceInstance
})