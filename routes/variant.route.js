import { Router } from "express";
import { createVariant } from "../controllers/variant.controller.js";
import isLoggedIn from "../middlewares/auth.js";

const router = Router();

router.post("/", isLoggedIn, createVariant);

export default router;