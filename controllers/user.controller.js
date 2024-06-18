import { User } from "../models/models.js";
import bcrypt from 'bcryptjs';


export const registerUser = async (request, response) => {
    const { name, password, phone, age } = request.body;

    if ((name || password || phone || age) === undefined) {
        console.log(name + " " + password + " " + phone + " " + age);
        return response
            .status(400)
            .json({ success: false, message: "incomplete data provided :(" });
    }

    try {
        const oldUser = await User.findOne({phone});
        if(oldUser) {
            return response
            .status(400)
            .json({ success: false, message: `user with phone: ${phone} already exists :(`});
        }
        const hash_password = await bcrypt.hash(password, 10);
        const savedUser = await User.create({name, password: hash_password, phone, age});
        return response
            .status(200)
            .json({success: true, message: "User registered successfully :)"});
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({success: false, message: "internal server error :)"});
    }
};
