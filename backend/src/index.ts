import express from 'express';

import ApiServer from "./interface/restfulApi/index.ts"
import WebSocketServer from "./interface/webSocket/index.ts"

const app = express();
const apiPort = 3000;
const webSocketPort = 3001

ApiServer({ app, port: apiPort })
WebSocketServer({ port: webSocketPort })