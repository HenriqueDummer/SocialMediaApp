import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try{
    console.log(req.cookies)
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({
        success: false,
        message: "Token invalid"
      })
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    } else {
      req.user = user;
      next();
    }
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later"
    })
  }
}