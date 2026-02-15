import express from "express";
import {signUp} from "../controllers/auth.controllers";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login",
    })
})

export default router;