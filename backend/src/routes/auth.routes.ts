import express from "express";
import {login, logout, signUp, verifyLogin, verifySignup} from "../controllers/auth.controllers";
;

const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-signup", verifySignup);

router.post("/login", login);
router.post("/verify-login", verifyLogin);

router.post("/logout", logout);

export default router;