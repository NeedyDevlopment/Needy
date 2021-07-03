const express = require("express");
const router = express.Router();
const { AuthForLogin } = require("../middleware/auth");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const Activity = require("../models/userActivity");

router.get("/", AuthForLogin, async(req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const currentUserId = await _.pick(
        jwt.verify(req.session.token, "MySecureKey"), ["_id"]
    );
    const usersPost = await Post.find({ creator: currentUserId._id })
        .populate("creator")
        .limit(5)
        .sort("-date");
    const totalPostsForMyactivity = await Post.countDocuments({
        creator: currentUserId._id,
    });
    let userActivities = await Activity.find({
            userId: currentUserId._id,
        })
        .limit(12)
        .populate("post")
        .populate("creator");
    const totalActivitiesForMyactivity = await Activity.countDocuments({
        userId: currentUserId._id,
    });
    console.log("totalactivities             " + totalActivitiesForMyactivity);
    console.log("usersPost             " + usersPost);
    res.status(200).render("myActivity.pug", {
        posts: usersPost,
        userActivities: userActivities,
        isLoggedIn: isLoggedIn,
        totalPostsForMyactivity: totalPostsForMyactivity,
        totalActivitiesForMyactivity: totalActivitiesForMyactivity,
    });
});

module.exports = router;