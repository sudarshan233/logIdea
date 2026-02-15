import appConfig from './app.config'
import mongoose from "mongoose";
import {DBConnection} from "../models/db.models";

export const connectDb: DBConnection= async () => {
    try {
        await mongoose.connect(appConfig.getInstance().configObj.db);
        console.log("Connected to MongoDB successfully.");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const disconnectDb: DBConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected MongoDB successfully.");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}