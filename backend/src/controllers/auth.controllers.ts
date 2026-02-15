import { Request, Response} from "express";

import {checkUserExistenceService, createUserService} from "../services/auth.services";
import {sendVerificationEmail} from "../services/mail.services";

export const signUp = async (
    req: Request , res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password is too short",
            })
        }

        const {isUserNameExist, isEmailExist} = await checkUserExistenceService(
            email, name
        )
        // console.log("isUserNameExist:", isUserNameExist, "isEmailExist:", isEmailExist)

        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        }

        if (isUserNameExist) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            })
        }

        const signupToken: string = Math.floor(
            100000 + Math.random() * 900000).toString();
        const isUserCreated: boolean = await createUserService({
            email,
            name,
            password,
            signupToken
        })
        if(isUserCreated) await sendVerificationEmail(email, signupToken)

        return res.status(200).json({
            success: true,
            message: "Successfully initiated Signup",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
