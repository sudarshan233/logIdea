import appConfig from './app.config'
import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(appConfig.getInstance().configObj.db);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}