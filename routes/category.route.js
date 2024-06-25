import { Router } from "express";
import { createCategory } from "../controllers/category.controller.js";
import isLoggedIn from "../middlewares/auth.js";

const router = Router();

router.post("/", isLoggedIn, createCategory);

export default router;