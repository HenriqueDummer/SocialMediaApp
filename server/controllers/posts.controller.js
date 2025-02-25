import Post from "../models/post.model.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: "user",
        select: ("-password")
      })
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        posts: []
      })
    } else {
      return res.status(200).json({
        posts
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const createPost = async (req, res) => {
  const user = req.user;
  const post = req.body;

  try {
    let { text, selectedFile } = post;

    if (!text && !selectedFile) {
      return res.status(400).json({
        message: "Must provide text or image"
      })
    }

    if (selectedFile) {
      const uploadedResponse = await cloudinary.uploader.upload(selectedFile)

      selectedFile = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: user._id,
      text,
      selectedFile
    })

    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const userPosts = await Post
      .find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: ("-password") });

    res.status(200).json({ user, userPosts })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter((id) => id.toString() !== user._id.toString());
    } else {
      post.likes.push(user._id);
    }

    await post.save();

    return res.status(200).json({
      likes: post.likes
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId)
      .populate({ path: "user", select: ("-password") })
      .populate({ path: "replies.user", select: ("-password") });

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    return res.status(200).json(post)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const postReply = async (req, res) => {
  try {
    const { postId } = req.params;

    const user = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const { text } = req.body;
    console.log(text)
    if (!text) {
      return res.status(400).json({ message: "Reply must have text" })
    }

    const newReply = {
      text,
      user: user._id
    }

    post.replies.push(newReply);
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const likeReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString();

    const { replyId } = req.body;
    if (!replyId) {
      return res.status(404).json({ message: "Must provide reply id" })
    }

    let post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: "Post not fund" })
    }

    const reply = post.replies.id(replyId)
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    const isReplyLiked = reply.likes.includes(userId)
    const updateQuery = isReplyLiked ?
      // $ -> updates only the matched reply
      { $pull: { "replies.$.likes": userId } }
      :
      { $addToSet: { "replies.$.likes": userId } }

    post = await Post.updateOne(
      { _id: postId, "replies._id": replyId },
      updateQuery
    )

    return res.status(201).json(post)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params
    const { text, selectedFile } = req.body

    const currentPost = Post.findById(postId)
    if (!currentPost) return res.status(404).json({ message: "Post not found" })

    console.log(currentPost)
    if (!text && !selectedFile) {
      return res.status(404).json({ message: "Must provide text or image" })
    }

    const update = {}
    if (text && text !== currentPost.text) {
      update.text = text
    }
    if (selectedFile && selectedFile !== currentPost.selectedFile) {
      if(currentPost.selectedFile){
        await cloudinary.uploader.destroy(currentPost.selectedFile)
      }
      const uploadedResponse = await cloudinary.uploader.upload(selectedFile)

      update.selectedFile = uploadedResponse.secure_url;
    }

    if (Object.keys(update).length === 0) {
      return res.status(200).json({
        message: "No changes detected",
        user: currentUser,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: update },
      { new: true }
    ).populate({ path: "user", select: ("-password") })

    return res.status(200).json(updatedPost)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}