import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    signupToken: String,
    signupTokenExpiresAt: Date,
    isSignupVerified: {
        type: Boolean,
        default: false,
    },
    loginToken: String,
    loginTokenExpiresAt: Date,
    isLoginVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

export default User;