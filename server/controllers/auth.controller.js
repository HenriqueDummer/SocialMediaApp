import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }



  try {
    res.status(200).json({ result: "Sign in success" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  try {
    if (!email || !password || !confirmPassword || !username)
      return res.status(400).json({ message: "All fields are required" })

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Email format is invalid" });

    const emailExists = await User.findOne({ email })
    if (emailExists)
      return res.status(400).json({ message: "Email already exists" })

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, username })

    if(newUser){
      await newUser.save();
    }

    res.status(200).json({ result: newUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

