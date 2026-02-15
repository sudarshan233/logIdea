"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = void 0;
const app_config_1 = __importDefault(require("./app.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(app_config_1.default.getInstance().configObj.db);
        console.log("Connected to MongoDB successfully.");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.connectDb = connectDb;
const disconnectDb = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log("Disconnected MongoDB successfully.");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.disconnectDb = disconnectDb;
