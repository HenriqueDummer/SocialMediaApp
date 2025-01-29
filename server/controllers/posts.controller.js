import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try{
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

    if(posts.length === 0){
      return res.status(404).json([])
    } else {
      return res.status(200).json(posts)
    }

  }catch(error){
    console.log(error)
    res.status(500).json({message: "Something went wrong, please try again later"})
  }
}

export const createPost = async (req, res) => {
  const user = req.user;
  const post = req.body;

  try{
    const {text, image} = post;

    if(!user && !image){
      return res.status(400).json({
        success: false,
        message: "Must provide text or image"
      })
    }

    if(image){
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

  }catch(error){
    console.log(error);
    res.status(500).json({message: "Something went wrong, please try again later"})
  }
}