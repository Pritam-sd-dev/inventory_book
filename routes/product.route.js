import { Router } from "express";
import {
    createProduct,
    getProductByBarcodeAndShopId,
} from "../controllers/product.controller.js";
import isLoggedIn from "../middlewares/auth.js";

const router = Router();

router.post("/", isLoggedIn, createProduct);
router.get("/", isLoggedIn, getProductByBarcodeAndShopId);

export default router;