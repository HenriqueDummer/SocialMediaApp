import Post from "../models/post.model.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = req.user;
    const { filter } = req.params


    const followingIds = user.following;
    let mongoFilter = {}

    if (filter === "following") {
      mongoFilter = { user: { $in: followingIds } }
    }

    const posts = await Post.find(mongoFilter)
      .skip(skip)
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

    if (posts.length === 0) {
      return res.status(200).json({
        message: "No posts found",
        data: { posts: [] },
      });
    }


    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const createPost = async (req, res) => {
  const user = req.user;
  const post = req.body;

  try {
    let { text, selectedFile, originalPost, isQuote } = post;

    if (!text && !selectedFile) {
      return res.status(400).json({
        message: "Must provide text or image",
      });
    }

    if (selectedFile) {
      const uploadedResponse = await cloudinary.uploader.upload(selectedFile);
      selectedFile = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: user._id,
      text,
      selectedFile,
      originalPost,
      isQuote
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userPosts = await Post
      .find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "originalPost" })
      .populate({ path: "originalPost", populate: "user" });

    return res.status(200).json({
      data: { user, posts: userPosts },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter((id) => id.toString() !== user._id.toString());
    } else {
      post.likes.push(user._id);
    }

    await post.save();

    return res.status(200).json({
      message: post.likes.includes(user._id) ? "Post liked" : "Post disliked",
      data: post.likes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(postId)
      .populate({ path: "user", select: "-password" })
      .populate({ path: "replies.user", select: "-password" })
      .populate({ path: "originalPost" })
      .populate({ path: "originalPost", populate: "user" })

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const postReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!text) {
      return res.status(400).json({
        message: "Reply must have text",
      });
    }

    const newReply = { text, user: user._id };
    post.replies.push(newReply);
    await post.save();

    return res.status(201).json({
      message: "Reply added successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const likeReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString();
    const { replyId } = req.body;

    if (!replyId) {
      return res.status(400).json({
        message: "Must provide reply ID",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const reply = post.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
      });
    }

    const isReplyLiked = reply.likes.includes(userId);
    const updateQuery = isReplyLiked
      ? { $pull: { "replies.$.likes": userId } }
      : { $addToSet: { "replies.$.likes": userId } };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "replies._id": replyId },
      updateQuery,
      { new: true }
    );

    return res.status(200).json({
      message: isReplyLiked ? "Reply unliked" : "Reply liked",
      data: { likes: updatedPost.replies.id(replyId).likes },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, selectedFile } = req.body;

    const currentPost = await Post.findById(postId);
    if (!currentPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!text && !selectedFile) {
      return res.status(400).json({
        message: "Must provide text or image",
      });
    }

    const update = {};
    if (text !== currentPost.text) {
      update.text = text;
    }
    if (!selectedFile && currentPost.selectedFile) {
      update.selectedFile = ""
      await cloudinary.uploader.destroy(currentPost.selectedFile);
    } else {
      if (selectedFile !== currentPost.selectedFile) {
        if (currentPost.selectedFile) {
          await cloudinary.uploader.destroy(currentPost.selectedFile);
        }
        const uploadedResponse = await cloudinary.uploader.upload(selectedFile);
        update.selectedFile = uploadedResponse.secure_url;
      }
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        message: "No changes detected",
        data: currentPost,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: update },
      { new: true }
    ).populate({ path: "user", select: "-password" });

    return res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)

    console.log("Delete")
    console.log(post)

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    } else {
      if (post.selectedFile) {
        await cloudinary.uploader.destroy(post.selectedFile);
      }
    } 

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}

export const repostPost = async (req, res) => {
  const user = req.user
  const { postId } = req.params

  try {
    const targetPost = await Post.findById(postId);

    let repostReference = targetPost

    if (targetPost.isRepost) {
      repostReference = targetPost.originalPost
    }


    if (!repostReference) {
      throw new Error('Post not found');
    }

    const newPost = new Post({
      user: user._id,
      isRepost: true,
      originalPost: repostReference._id
    });

    const repost = await newPost.save();

    const populatedRepost = await repost.populate([
      { path: "originalPost" },
      { path: "user", select: "-password" },
    ]);

    console.log(populatedRepost)


    return res.status(201).json({
      message: "Successfully reposted",
      data: populatedRepost
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
}