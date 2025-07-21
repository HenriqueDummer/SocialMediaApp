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
    replies: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            likes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }],
            createdAt: { type: Date, default: Date.now() }
        }
    ],
    createdAt: { type: Date, default: Date.now() },
    isRepost: {
        type: Boolean,
        default: false,
    },
    isQuote: {
        type: Boolean,
        default: false
    },
    originalPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        default: null
    }
})

const Post = mongoose.model('posts', postSchema);

export default Post