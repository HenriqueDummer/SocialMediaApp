import Post from "../models/post.model.js";

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
      .populate({
        path: ("comments.user"),
        select: ("-password")
      })

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
    const { text, image } = post;

    if (!user && !image) {
      return res.status(400).json({
        message: "Must provide text or image"
      })
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)

      image = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: user._id,
      text,
      image
    })

    await newPost.save();

    res.status(201).json(newPost);

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