import { Variant } from "../models/models";


export const createVariant = async (request, response) => {
    const { name } = request.body;
    try {
        const variant = await Variant.create({name});
        if((name) == undefined) {
            return response
                .status(400)
                .json({ success: false, message: "name is not provided :(" });
        }
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    } 
}