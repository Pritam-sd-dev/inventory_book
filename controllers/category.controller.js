import { Category } from "../models/models.js";


export const createCategory = async (request, response) => {
    const {name, imageUrl, shopId} = request.body;

    if((name || shopId) == undefined) {
        return response
            .status(400)
            .json({ success: false, message: "name or shopId is not provided :(" });
    }
    try {
        const savedCategory = await Category.create({name, imageUrl, shop: shopId});
        return response.status(200).json({
            success: true,
            data: { categoryId: savedCategory.id },
        });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
}