import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
  },
  coverPicture: {
    type: String,
    default: "https://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4433.jpghttps://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4433.jpg",
  },
  bio:{
    type: String,
    default: "",
  }
})

const User = mongoose.model('User', userSchema);

export default User;