import User from "../models/user.model.js";
import Post from "../models/post.model.js"
import { v2 as cloudinary } from "cloudinary"; // Added missing import for cloudinary

export const updateProfile = async (req, res) => {
  try {
    const currentUser = req.user;
    const { fullName, bio, profilePicture, coverPicture } = req.body;

    if (!fullName || !profilePicture || !coverPicture) {
      return res.status(400).json({
        message: "Must provide fullName, profile image, and cover image",
      });
    }

    const update = {};
    if (fullName && fullName !== currentUser.fullName) {
      update.fullName = fullName;
    }
    if (bio !== undefined && bio !== currentUser.bio) { // Allow empty bio
      update.bio = bio;
    }
    if (profilePicture && profilePicture !== currentUser.profilePicture) {
      if (currentUser.profilePicture) {
        await cloudinary.uploader.destroy(currentUser.profilePicture);
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
      update.profilePicture = uploadedResponse.secure_url;
    }
    if (coverPicture && coverPicture !== currentUser.coverPicture) {
      if (currentUser.coverPicture) {
        await cloudinary.uploader.destroy(currentUser.coverPicture);
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverPicture);
      update.coverPicture = uploadedResponse.secure_url;
    }

    if (Object.keys(update).length === 0) {
      return res.status(200).json({
        message: "No changes detected",
        data: { user: currentUser },
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { $set: update },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const follow = async (req, res) => {
  try {
    const currentUser = req.user;
    const { userId: targetUserId } = req.params

    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(400).json({ message: "User not found" })
    }

    const isFollowing = currentUser.following.includes(targetUserId)
    let updatedUser
    if (isFollowing) {
      [updatedUser] = await Promise.all([
        User.findByIdAndUpdate(
          currentUser._id,
          { $pull: { following: targetUserId } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          targetUserId,
          { $pull: { followers: currentUser._id } },
          { new: true }
        )
      ])
    } else {
      [updatedUser] = await Promise.all([
        User.findByIdAndUpdate(
          currentUser._id,
          { $addToSet: { following: targetUserId } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          targetUserId,
          { $addToSet: { followers: currentUser._id } },
          { new: true }
        )
      ])
    }
    const message = isFollowing ? `Unfollowed ${targetUser.fullName}` : `Followed ${targetUser.fullName}`
    console.log(updatedUser)
    return res.status(201).json({ message, data: updatedUser.following })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}

export const searchForUsers = async (req, res) => {
  try {
    const { query } = req.params;
    console.log(query)
    if (!query) {
      return res.status(400).json({
        message: "Must provide search query",
      });
    }

    const users = await User.find({
      $or: [
        { fullName: { $regex: new RegExp(`^${query}`, "i") } },
        { username: { $regex: new RegExp(`^${query}`, "i") } },
      ],
    })
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}

export const searchAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { query } = req.params;

    const usersResults = await User.find({
      $or: [
        { username: { $regex: new RegExp(`^${query}`, "i") } },
        { fullName: { $regex: new RegExp(`^${query}`, "i") } }
      ]
    })

    const postsResults = await Post.find(
      { text: { $regex: new RegExp(`${query}`, "i") } }
    ).skip(skip)
      .limit(limit)
      .populate({ path: "user", select: "-password" })
      .populate({
        path: "originalPost",
        populate: [
          { path: "user" },
          {
            path: "originalPost",
            populate: { path: "user" }
          }
        ]
      })
      .sort({ createdAt: -1 });

    console.log(postsResults)
    if (usersResults.length === 0 && postsResults.length === 0) {
      return res.status(400).json({ message: "No results found" })
    }

    return res.status(200).json({ data: { users: usersResults, posts: postsResults } })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}

export const whoToFollow = async (req, res) => {
  try{
    const user = req.user

    const mostFollowedUsers = await User
    .find({ _id: {
      $ne: user._id,
      $nin: user.following
    } })
    .sort({ "followers.length": 1 })
    .select("-password")
    .limit(5); 

    return res.status(200).json(mostFollowedUsers)
    
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}

export const following = async (req, res) => {
  try{
    const user = req.user

    const following = await User
    .find({ _id: {
      $ne: user._id,
      $in: user.following
    } })
    .sort({ "followers.length": -1 })
    .select("-password")
    .limit(5); 
    
    return res.status(200).json(following)
    
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}