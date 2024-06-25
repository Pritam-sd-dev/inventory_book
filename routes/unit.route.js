import { Router } from "express";
import { createUnit } from "../controllers/unit.controller";
import isLoggedIn from "../middlewares/auth";

const router = Router();

router.post("/", isLoggedIn, createUnit);

export default router;