import { Router } from "express";
import { createShop, getAllShops } from "../controllers/shop.controller.js";
import isLoggedIn from "../middlewares/auth.js";

const router = Router();

router.post("/", isLoggedIn, createShop);
router.get("/", isLoggedIn, getAllShops);

export default router;