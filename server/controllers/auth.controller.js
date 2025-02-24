import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateAndSaveToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
  });
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }


    generateAndSaveToken(user._id, res);
    res.status(200).json({
      message: "Signin successful"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong, please try again later"
    })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, username, fullName } = req.body;

  try {
    if (!email || !password || !confirmPassword || !username || !fullName)
      return res.status(400).json({
        message: "All fields are required"
      })

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passwords do not match"
      })

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({
        message: "Email format is invalid"
      });

    const emailExists = await User.findOne({ email })
    if (emailExists)
      return res.status(400).json({
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

        message: "User could not be created"
      })
    }

    res.status(200).json({
      newUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong, please try again later"
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      message: "Signout successful"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong, please try again later"
    })
  }
}
export const updateProfile = async (req, res) => {
  try {
    const currentUser = req.user
    const { fullName, bio, profilePicture, coverPicture } = req.body

    const update = {}
    if (fullName !== currentUser.fullName) {
      update.fullName = fullName
    }
    if (bio !== currentUser.bio) {
      update.bio = bio
    }
    if (profilePicture !== currentUser.profilePicture) {
      update.profilePicture = profilePicture

      await cloudinary.uploader.destroy(currentUser.profilePicture)
      const uploadedResponse = await cloudinary.uploader.upload(update.profilePicture)

      update.profilePicture = uploadedResponse.secure_url;
    }
    if (coverPicture !== currentUser.coverPicture) {
      update.coverPicture = coverPicture

      await cloudinary.uploader.destroy(currentUser.coverPicture)
      const uploadedResponse = await cloudinary.uploader.upload(update.coverPicture)

      update.coverPicture = uploadedResponse.secure_url;
    }

    if (Object.keys(update).length === 0) {
      return res.status(200).json({
        message: "No changes detected",
        user: currentUser,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { $set: update },
      {new: true} // returns the updated version of User
    ).select(
      "-password"
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong, please try again later"
    })
  }
}