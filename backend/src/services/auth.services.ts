import jwt from 'jsonwebtoken';
import { Response } from 'express'

import appConfig from "../config/app.config";
import {
    fnCreateUser, fnDestroyLoginToken, fnLoginUser, fnStoreLoginToken, fnUserExistence, fnVerifyToken
} from "../repository/auth.repository";
import {connectDb, disconnectDb} from "../config/db.config";
import { CreateUser } from '../models/auth.models';

export const generateJWT = (res: Response, userId: string) => {
    const token = jwt.sign(
        {userId}, appConfig.getInstance().configObj.jwtSecret, { expiresIn: "7d"}
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: appConfig.getInstance().configObj.isProduction,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    return token;
}

export const checkUserExistenceService = async (
    email: string, name: string) => {

    return await fnUserExistence({
        email, name
    }, connectDb, disconnectDb)
}

export const createUserService = async (
    userDetails: CreateUser) => {
    return await fnCreateUser(userDetails, connectDb, disconnectDb)
}

export const verifyToken = async (email: string, token: string, authType: string) => {
    return await fnVerifyToken(email, token, authType, connectDb, disconnectDb)
}

export const loginUser = async (email: string, password: string) => {
    return await fnLoginUser(email, password, connectDb, disconnectDb)
}

export const storeLoginToken = async (email: string, loginToken: string) => {
    return await fnStoreLoginToken(email, loginToken, connectDb, disconnectDb)
}

export const destroyLoginToken = async (email: string) => {
    return await fnDestroyLoginToken(email, connectDb, disconnectDb)
}