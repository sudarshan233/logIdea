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
        if(isConnClosed) return true
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

export const fnVerifySignupToken = async (
    token: string, openMongoose: DBConnection,
    closeMongoose: DBConnection) => {
        try {
            const isConnOpen: boolean = await openMongoose();
            if(isConnOpen) {
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
            } else {
                throw new Error(
                    "Unable to connect to MongoDB for verifying signup token"
                );
            }
        } catch (error) {
            console.error(error);
            return false;
        }
}