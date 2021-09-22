const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    // creator: {
    //   _id: String,
    //   username: String,
    //   email: String,
    //   followers: {
    //     type: Number,
    //     default: 0,
    //   },
    //   photo: String,
    // }
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: String,
    category: String,
    city: String,
    title: String,
    description: String,
    contact: Number,
    // image: String,
    image: {
        url: String,
        cloudinary_id: String
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    likedArray: [],
    commentedArray: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        commentText: String,
        date: String
    }],
    commentedArrayWithOnlyUserId: [],
    savedArray: [],
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;