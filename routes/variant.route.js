import { Router } from "express";
import { createVariant } from "../controllers/variant.controller";
import isLoggedIn from "../middlewares/auth";

const router = Router();

router.post("/", isLoggedIn, createVariant);

export default router;