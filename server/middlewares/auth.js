import jwt from "jsonwebtoken";
import User from "../models/User.js";

//middleware to protect
const protectRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies?.token || req.headers?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User, Token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User. Token is Incorrect thus User not found",
      });
    }

    req.user = user;
    next();
    
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export { protectRoute };
