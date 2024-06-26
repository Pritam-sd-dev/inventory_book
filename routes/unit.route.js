import { Router } from "express";
import { createUnit } from "../controllers/unit.controller.js";
import isLoggedIn from "../middlewares/auth.js";

const router = Router();

router.post("/", isLoggedIn, createUnit);

export default router;