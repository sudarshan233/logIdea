import express from "express";
import {login, signUp, verifySignup} from "../controllers/auth.controllers";
;

const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-signup", verifySignup);

router.post("/login", login);

export default router;