const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    creator: {
        _id: String,
        username: String,
        email: String,
        followers: {
            type: Number,
            default: 0
        }
    },
    date: String,
    category: String,
    city: String,
    title: String,
    description: String,
    contact: Number,
    image: {
        data: Buffer,
        contentType: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    likedArray: [],
    commentedArray: [],
    commentedArrayWithOnlyUserId: [],
    savedArray: []
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;