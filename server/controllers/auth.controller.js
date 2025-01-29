import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateAndSaveToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: false,
    secure: false,
    sameSite: "none"
  });
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }


    generateAndSaveToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "Signin successful"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later"
    })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  try {
    if (!email || !password || !confirmPassword || !username)
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })

    if (password !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      })

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({
        success: false,
        message: "Email format is invalid"
      });

    const emailExists = await User.findOne({ email })
    if (emailExists)
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      })

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, username })

    if (newUser) {
      generateAndSaveToken(newUser._id, res);
      await newUser.save();
    } else {
      return res.status(400).json({
        success: false,
        message: "User could not be created"
      })
    }

    res.status(200).json({
      success: true,
      result: newUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

