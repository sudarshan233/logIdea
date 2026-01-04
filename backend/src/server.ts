import express from "express";

import authRoutes from "./routes/auth.routes";
import {connectDb} from "./config/db.config";

const app = express();

app.use(express.json());
connectDb()

app.use("/api/auth", authRoutes)

export default app;