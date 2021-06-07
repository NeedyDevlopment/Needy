const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        // required: true we don't require postId for following and Unfollowing 
    },
    commentText: String
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;