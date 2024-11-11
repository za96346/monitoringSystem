import express from 'express';

import ApiServer from "interface/restfulApi/index"
import WebSocketServer from "./interface/webSocket/index"

// 基礎設施層
import Presistence from "infrastructure/presistence/index"

const app = express();
const presistence = Presistence()

const apiPort = 3000;
const webSocketPort = 3001

ApiServer({ app, port: apiPort, presistence })
WebSocketServer({ port: webSocketPort, presistence })