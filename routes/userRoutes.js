import { Router } from "express";
import { logIn, signUp } from "../controllers/userController.js";

const router = Router();

// Loggin in user
router.post("/login", logIn);

router.post("/sign-up", signUp);

export default router;