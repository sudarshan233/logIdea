import { Request, Response} from "express";

import {
    checkUserExistenceService, createUserService, generateJWT, loginUser, storeLoginToken,
    verifyToken
} from "../services/auth.services";
import {sendLoggedInMail, sendVerificationEmail, sendWelcomeEmail} from "../services/mail.services";

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

        return res.status(201).json({
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

export const verifySignup = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body;
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Verification code is required",
            })
        }

        const isTokenValid = await verifyToken(code, "signup");
        if (!isTokenValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code",
            })
        }
        
        sendWelcomeEmail(email);

        return res.status(200).json({
            success: true,
            message: "Signup verified successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const {isEmailExist, isPasswordCorrect} = await loginUser(email, password);

        if (!isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "Email does not exist",
            })
        }

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            })
        }
        
        const loginToken = Math.floor(100000 + Math.random() * 900000).toString();
        const isLoginTokenStored = await storeLoginToken(email, loginToken);
        if(isLoginTokenStored) await sendVerificationEmail(email, loginToken);
        
        return res.status(200).json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const verifyLogin = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body;
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Verification code is required",
            })
        }

        const isTokenValid = await verifyToken(code, "login");
        if (!isTokenValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code",
            })
        }
        
        // To Build: Send Mail notifying that they have logged in successfully
        await sendLoggedInMail(email);

        return res.status(200).json({
            success: true,
            message: "Login verified successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
