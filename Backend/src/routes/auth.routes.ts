import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = express.Router();

// REGISTER USER

router.post("/register", registerUser);

// LOGIN USER

router.post("/login", loginUser);

// EXPORT ROUTER

export default router;
