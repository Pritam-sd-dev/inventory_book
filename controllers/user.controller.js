import { User } from "../models/models.js";
import bcrypt from "bcryptjs";

export const registerUser = async (request, response) => {
    const { name, password, phone, age } = request.body;

    if ((name || password || phone || age) === undefined) {
        return response
            .status(400)
            .json({ success: false, message: "incomplete data provided :(" });
    }

    try {
        const oldUser = await User.findOne({ phone });
        if (oldUser) {
            return response
                .status(400)
                .json({
                    success: false,
                    message: `user with phone: ${phone} already exists :(`,
                });
        }
        const hash_password = await bcrypt.hash(password, 10);
        await User.create({ name, password: hash_password, phone, age });
        return response
            .status(200)
            .json({
                success: true,
                message: "User registered successfully :)",
            });
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({ success: false, message: "internal server error :)" });
    }
};

export const login = async (request, response) => {
    const { phone, password } = request.body;

    try {
        const savedUser = await User.findOne({ phone });
        if (!savedUser) {
            return response
                .status(400)
                .json({
                    success: false,
                    message: `user with phone: ${phone} doesn't exists :(`,
                });
        }

        const isMatch = await bcrypt.compare(password, savedUser.password);
        if (!isMatch) {
            return response
                .status(400)
                .json({
                    success: false,
                    message: `wrong credentials provided:(`,
                });
        }

        const token = savedUser.generateToken();
        response.cookie("token", token, { maxAge: 2 * 24 * 60 * 60 * 1000 });
        response
            .status(200)
            .json({ status: true, message: "user successfully loggedIn :)" });
    } catch (error) {
        res.status(503).json({status: false, message: 'something went wrong :(, please try again'});
    }
};
