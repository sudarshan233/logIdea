import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }
});

const User = mongoose.Model("User", userSchema);

export default User;