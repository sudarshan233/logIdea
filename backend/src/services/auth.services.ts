import jwt from 'jsonwebtoken';
import { Response } from 'express'

import appConfig from "../config/app.config";
import {
    fnCreateUser, fnLoginUser, fnStoreLoginToken, fnUserExistence, fnVerifyToken
} from "../repository/auth.repository";
import {connectDb, disconnectDb} from "../config/db.config";
import { CreateUser } from '../models/auth.models';

export const generateJWT = (userId: string) => {
    return jwt.sign(
        {userId}, appConfig.getInstance().configObj.jwtSecret, { expiresIn: "15d"}
    )
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

export const verifyToken = async (token: string, authType: string) => {
    return await fnVerifyToken(token, authType, connectDb, disconnectDb)
}

export const loginUser = async (email: string, password: string) => {
    return await fnLoginUser(email, password, connectDb, disconnectDb)
}

export const storeLoginToken = async (email: string, loginToken: string) => {
    return await fnStoreLoginToken(email, loginToken, connectDb, disconnectDb)
}
