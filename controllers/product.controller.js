import { Product } from "../models/models.js";

export const getProductByBarcodeAndShopId = async (request, response) => {
    const { barcode, shopId } = request.params;
 
    if((barcode || shopId) == undefined) {
        return response
            .status(400)
            .json({ success: false, message: "barcode or shopId is not provided :(" });
    }

    try {
        const products = await Product.find({barcode, shop: shopId});
        return response.status(200).json({
            success: true,
            data: { products },
        });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
};

export const createProduct = async (request, response) => {
    const {
        name,
        mrp,
        selleingPrice,
        purchasePrice,
        manufacturingDate,
        expiryDate,
        purchaseDate,
        barcode,
        quantity,
        minQuantity,
        category,
        packingTime,
        variant,
        unit,
        images,
        shop,
    } = request.body;
    try {
        // check if

        const savedProduct = await Product.create({
            name,
            mrp,
            selleingPrice,
            purchasePrice,
            manufacturingDate,
            expiryDate,
            purchaseDate,
            barcode,
            quantity,
            minQuantity,
            category,
            packingTime,
            variant,
            unit,
            images,
            shop,
        });

        return response.status(200).json({
            success: true,
            data: { productId: savedProduct.id },
        });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
};
