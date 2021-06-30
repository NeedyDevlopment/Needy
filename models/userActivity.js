const mongoose = require("mongoose");
const Post = require("./post");

const activitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    activity_action: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        // required: true we don't require postId for following and Unfollowing
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // we don't require creatorId for liked and unliked,commented
    },
    posts: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    commentText: String,
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;