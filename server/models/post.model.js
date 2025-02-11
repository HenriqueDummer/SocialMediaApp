import mongoose from "mongoose";

const postSchema = mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: String,
    selectedFile: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }
        }
    ],
    createdAt: { type: Date, default: new Date() },
})

const Post = mongoose.model('posts', postSchema);

export default Post