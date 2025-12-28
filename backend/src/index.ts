import app from "./server";

import dotenv from "dotenv";
import appConfig from "./config/app.config";
dotenv.config();

const errorHandler = (error: Error | undefined) => {
    if(error) console.error(error);

    console.log('Server running on port', PORT);
}

const PORT = appConfig.getInstance().configObj.port;

app.listen(PORT, errorHandler)