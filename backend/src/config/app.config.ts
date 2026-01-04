import dotenv from "dotenv";
dotenv.config();

class AppConfig {
    configObj = {}
    constructor() {
        this.configObj = {
            port: process.env.PORT,
            db: process.env.MONGO_URI,
        }
        Object.freeze(this.configObj)
    }
}

class Config {
    static #instance: any;

    constructor() {
        throw Error("Restricted Class")
    }

    static getInstance() {
        if(!Config.#instance) {
            Config.#instance = new AppConfig();
        }
        return Config.#instance;
    }
}

export default Config;