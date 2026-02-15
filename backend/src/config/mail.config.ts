import nodeMailer from "nodemailer";
import appConfig from "./app.config";

export const mailerClient = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: appConfig.getInstance().configObj.emailUserName,
        pass: appConfig.getInstance().configObj.emailPassword,
    }
})