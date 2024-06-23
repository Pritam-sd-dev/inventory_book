import { Shop } from "../models/models.js";


export const getAllShops = async (request, response) => {
    try {
        const shops = await Shop.find({owner: request.user.id});
        return response
            .status(200)
            .json({
                success: true,
                data: {shops}
            });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
}


export const createShop = async (request, response) => {
    const {opensAt, closesAt, phone, name} = request.body;

    if((opensAt || closesAt || phone || name) == undefined) {
        return response
            .status(400)
            .json({ success: false, message: "incomplete data provided :(" });
    }

    try {
        const savedShop = await Shop.create({name, phone, opensAt, closesAt, owner: request.user.id});
        return response
            .status(200)
            .json({
                success: true,
                message: "shop registered successfully :)",
                data: {shopId: savedShop.id}
            });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
}