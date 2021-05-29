import { Router } from "express";
import { getMobiles, createMobile } from "../controllers/productController.js";

const router = Router();

router.get("/", getMobiles);

router.post("/", createMobile);

export default router;
