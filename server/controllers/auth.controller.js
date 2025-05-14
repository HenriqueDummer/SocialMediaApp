import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"; // Added missing import for cloudinary

function generateAndSaveToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: false,
  });
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    user = await User.findOne(({email})).select("-password")

    generateAndSaveToken(user._id, res);
    return res.status(200).json({
      message: `Welcome back ${user.fullName}`,
      data: user  
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, username, fullName } = req.body;

  try {
    if (!password || !confirmPassword || !username || !fullName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email format is invalid",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, username, fullName });
    await newUser.save();

    const createdUser = await User.findById(newUser._id).select("-password");

    generateAndSaveToken(newUser._id, res);

    return res.status(201).json({
      message: "Signup successful",
      data: createdUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    console.log("get me called")
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      data: user ,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      message: "Signout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

