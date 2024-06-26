import { Unit } from "../models/models.js";


export const createUnit = async (request, response) => {
    const { name } = request.body;

    if((name) == undefined) {
        return response
            .status(400)
            .json({ success: false, message: "name is not provided :(" });
    }

    try {
        const savedUnit = await Unit.create({name});
        return response.status(200).json({
            success: true,
            data: { unitId: savedUnit.id },
        });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
}