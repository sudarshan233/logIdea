import bcrypt from 'bcryptjs';

import User from "../models/User";
import {DBConnection} from "../models/db.models";
import {CreateUser, UserExistenceCriteria} from "../models/auth.models";

export const fnUserExistence = async (
    criteria: UserExistenceCriteria, openMongoose: DBConnection,
    closeMongoose: DBConnection) => {

    const { email, name } = criteria;
    const isConnOpen: boolean = await openMongoose();
    if(isConnOpen) {
        const isUserNameExist = await User.findOne({ name });
        const isEmailExist = await User.findOne({ email });
        const isConnClosed = await closeMongoose();
        if(isConnClosed) return {
            isUserNameExist: isUserNameExist ? true : false,
            isEmailExist: isEmailExist ? true : false
        }
        else throw new Error("Unable to disconnect from MongoDB" +
            "after checking the existence of user's account")
    } else
        throw new Error("Unable to connect to MongoDB for checking the existence" +
            " of user's account.");
}

export const fnCreateUser = async (
    userDetails: CreateUser,  openMongoose: DBConnection,
    closeMongoose: DBConnection) => {
    const { email, name, password, signupToken } = userDetails;

    try {
        const isConnOpen: boolean = await openMongoose();
    if(isConnOpen) {
        const user = new User({
            email,
            name,
            password,
            signupToken,
            signupTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })
        await user.save()

        const isConnClosed = await closeMongoose();
        if(isConnClosed) return user
        else throw new Error("Unable to disconnect from MongoDB" +
            "after checking the existence of user's account")
    } else
        throw new Error("Unable to connect to MongoDB for checking the existence" +
            " of user's account.");
    } catch (error) {
        console.error(error)
        return false
    }
}

export const fnVerifyToken = async (
    token: string, authType: string, openMongoose: DBConnection,
    closeMongoose: DBConnection) => {
        try {
            console.log("Verifying token:", token, "for authType:", authType)
            const isConnOpen: boolean = await openMongoose();
            if(isConnOpen && authType === "signup") {
                const user = await User.findOne({
                    signupToken: token, 
                    signupTokenExpiresAt: { $gt: Date.now() }
                });
                if(!user) {
                    await closeMongoose();
                    return false;
                }

                user.isSignupVerified = true;
                user.signupToken = undefined;
                user.signupTokenExpiresAt = undefined;
                await user.save();

                const isConnClosed = await closeMongoose();
                if(isConnClosed) return user ? true : false;
                else throw new Error(
                    "Unable to disconnect from MongoDB after verifying signup token"
                );
            } else if (isConnOpen && authType === "login") {
                const user = await User.findOne({
                    loginToken: token, 
                    loginTokenExpiresAt: { $gt: Date.now() }
                });
                console.log("User found for login token verification:", user)
                if(!user) {
                    await closeMongoose();
                    return false;
                }
                user.isLoginVerified = true;
                user.loginToken = undefined;
                user.loginTokenExpiresAt = undefined;
                user.lastLogin = new Date();
                await user.save();

                const isConnClosed = await closeMongoose();
                if(isConnClosed) return user ? true : false;
                else throw new Error(
                    "Unable to disconnect from MongoDB after verifying login token"
                );
            } 
            else {
                throw new Error(
                    "Unable to connect to MongoDB for verifying signup token"
                );
            }
        } catch (error) {
            console.error(error);
            return false;
        }
}

export const fnLoginUser = async (
    email: string, password: string, openMongoose: DBConnection,
    closeMongoose: DBConnection) => {
    let isEmailExist: boolean = false;
    let isPasswordCorrect: boolean = false;
    try {
        const isConnOpen: boolean = await openMongoose();
        if(isConnOpen) {
            const user = await User.findOne({ email });
            isPasswordCorrect = await bcrypt.compare(password, user ? user.password : "");
            if(user && isPasswordCorrect) {
                isEmailExist = true;
                isPasswordCorrect = true;
                const isConnClosed = await closeMongoose();
                if(isConnClosed) return {
                    isEmailExist,
                    isPasswordCorrect,
                    user
                }
                else throw new Error("Unable to disconnect from MongoDB after login");
            } else {
                isEmailExist = user ? true : false;
                isPasswordCorrect = false;
                const isConnClosed = await closeMongoose();
                if(isConnClosed) return {
                    isEmailExist,
                    isPasswordCorrect, 
                    user: null
                }
                else throw new Error("Unable to disconnect from MongoDB after login");
            }
        } else {
            throw new Error("Unable to connect to MongoDB for login");
        }
    } catch (error) {
        console.error(error);
        return {
            isEmailExist,
            isPasswordCorrect
        }
    }   
}

export const fnStoreLoginToken = async (
    email: string, loginToken: string, openMongoose: DBConnection,
    closeMongoose: DBConnection) => {
    try {
        const isConnOpen: boolean = await openMongoose();
        if(isConnOpen) {
            const user = await User.findOne({ email });
            if(user) {
                user.loginToken = loginToken;
                user.loginTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
                await user.save();
                const isConnClosed = await closeMongoose();
                if(isConnClosed) return true;
                else throw new Error("Unable to disconnect from MongoDB after storing login token");
            } else {
                const isConnClosed = await closeMongoose();
                if(isConnClosed) return false;
                else throw new Error("Unable to disconnect from MongoDB after storing login token");
            }
        } else {
            throw new Error("Unable to connect to MongoDB for storing login token");
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}