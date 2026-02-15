import { mailerClient } from "../config/mail.config";
import appConfig from "../config/app.config";
import {VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "../models/mail.models";

export const sendVerificationEmail = async(
    email: string, verificationToken: string) => {
    try {
        const response = await mailerClient.sendMail({
            from: appConfig.getInstance().configObj.emailUserName,
            to: email,
            subject: "Verify your mail",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}", verificationToken)
        })
        console.log("Account Verification Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendWelcomeEmail = async(email: string) => {

    try {
        const response = await mailerClient.sendMail({
            from: appConfig.getInstance().configObj.emailUserName,
            to: email,
            subject: "Finally, you have arrived!!",
            html: WELCOME_EMAIL_TEMPLATE
        })
        console.log("Welcome Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}