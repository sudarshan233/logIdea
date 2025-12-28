"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_config_1 = __importDefault(require("./config/app.config"));
dotenv_1.default.config();
const errorHandler = (error) => {
    if (error)
        console.error(error);
    console.log('Server running on port', PORT);
};
const PORT = app_config_1.default.getInstance().configObj.port;
server_1.default.listen(PORT, errorHandler);
