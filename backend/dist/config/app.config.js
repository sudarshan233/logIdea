"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _Config_instance;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AppConfig {
    constructor() {
        this.configObj = {};
        this.configObj = {
            port: process.env.PORT,
            db: process.env.MONGO_URI,
        };
        Object.freeze(this.configObj);
    }
}
class Config {
    constructor() {
        throw Error("Restricted Class");
    }
    static getInstance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Config_instance)) {
            __classPrivateFieldSet(_a, _a, new AppConfig(), "f", _Config_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Config_instance);
    }
}
_a = Config;
_Config_instance = { value: void 0 };
exports.default = Config;
