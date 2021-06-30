const User = require("../models/user");
const Post = require("../models/post");
const Activity = require("../models/userActivity");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

router.post("/", async(req, res, next) => {
    // const activity_PostId = req.body.activity_PostId;
    // const activity_action = req.body.activity_action;
    const activityId = req.body.activityId;
    const activity = await Activity.findById(activityId);
    const activity_postId = activity.post;
    const activity_action = activity.activity_action;
    const activity_date = activity.date;
    const activity_comment = activity.commentText ? activity.commentText : null;
    const post = await Post.findOne({ _id: activity_postId }).populate("creator");
    console.log("activity post is:::::");
    console.log(post);
    const currentUserId = req.session.token ?
        await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"]) :
        "";
    const currentUser = req.session.token ?
        await User.findOne({ _id: currentUserId._id }) : { followingsArray: [] };
    res.status(200).render("activityPost.pug", {
        posts: [post],
        currentUserId: currentUserId._id,
        currentUserFollowingsArray: currentUser.followingsArray,
        activity_action: activity_action,
        activity_comment: activity_comment,
        activity_date: activity_date,
    });
});

module.exports = router;