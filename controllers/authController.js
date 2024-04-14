const errorResponse = require("../utils/errorResponse");
const userModel = require("../models/usermodel");

//JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

//REGISTER
exports.registerController = async() => {
    try {
        const { username, email, password } = req.body;
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse("Email is already registered", 500));
        }
        const user = await userModel.create({ username, email, password });
        this.sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
//Login
exports.loginController = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            returnnext(new errorResponse("Please provide emial and password"));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid Creditial", 401));
        }
        const isMatch = await userModel.matchPassword(password);
        if (!isMatch) {
            return next(new errorHandler("Invalid Creditial", 401));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//Logout
exports.logoutController = async(req, res) => {
    res.clearCookie("refresh Token");
    return res.status(200).json({
        success: true,
        message: "logout Successfully",
    });
};