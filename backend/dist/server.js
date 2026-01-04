"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_config_1 = require("./config/db.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_config_1.connectDb)();
app.use("/api/auth", auth_routes_1.default);
exports.default = app;
