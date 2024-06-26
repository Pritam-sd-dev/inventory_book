import { Variant } from "../models/models.js";


export const createVariant = async (request, response) => {
    const { name } = request.body;
    if((name) == undefined) {
        return response
            .status(400)
            .json({ success: false, message: "name is not provided :(" });
    }
    try {
        const variant = await Variant.create({name});
        return response.status(200).json({
            success: true,
            data: { variantId: variant.id },
        });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    } 
}