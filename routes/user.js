import { Router } from "express";
import { logIn } from "../controllers/user.js";

const router = Router();

// Loggin in user
router.post("/login", logIn);

export default router;
