const errorHandler = require("../middlewares/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

//REGISTER
exports.registerContoller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return next(new errorResponse("Email is required", 400));
    }

    try {
      const user = await userModel.create({ username, email, password });

      this.sendToken(user, 201, res);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyValue) {
        // Duplicate key error
        return next(new errorResponse("Email is already registered", 500));
      }
      throw err; // Rethrow other errors
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
