const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //mongoose cast Error
  if (err.name === "castError") {
    const message = "Resources Not Found";
    error = new errorResponse(message, 404);
  }
  //duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value enterd";
    error = new errorResponse(message, 400);
  }

  if (
    error.code === 11000 &&
    error.keyPattern &&
    error.keyPattern.email === 1
  ) {
    return res.status(400).json({ error: "Email already exists" });
  }

  //mongoose validation
  if (err.name === "ValidationError") {
    const messgae = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

module.exports = errorHandler;
