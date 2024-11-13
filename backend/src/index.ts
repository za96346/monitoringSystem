import { config } from 'dotenv';

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
import UserDomainService from './domain/service/UserDomainService';

config()

const presistence = Presistence({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
    logging: ['error', 'query', 'schema'],
    entities: [DevicePo, UserPo, DeviceDataPo]
})
const appServiceInstance = {
    DeviceApp: new DeviceApp({
        deviceRepo: presistence.Device,
        deviceDomainService: new DeviceDomainService()
    }),
    DataMonitorApp: new DataMonitorApp(),
    EntryApp: new EntryApp({
        userRepo: presistence.User,
        userDomainService: new UserDomainService(),
        jwtSecretKey: process.env.JWT_SECRET_KEY
    })
}

ApiServer({
    port: parseInt(process.env.API_PORT),
    appService: appServiceInstance,
    jwtSecretKey: process.env.JWT_SECRET_KEY
})
WebSocketServer({
    port: parseInt(process.env.WS_PORT),
    presistence,
    appService: appServiceInstance
})