import express from "express";

const router = express.Router();

router.post("/signup", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Signup",
    })
})

router.post("/login", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login",
    })
})

export default router;