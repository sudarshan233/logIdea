import app from "./server";

import dotenv from "dotenv";
dotenv.config();

const errorHandler = (error: Error | undefined) => {
    if(error) console.error(error);

    console.log('Server running on port', PORT);
}

const PORT = process.env.PORT

app.listen(PORT, errorHandler)