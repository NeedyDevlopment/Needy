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
    const usersPost = await Post.find({ "creator._id": currentUserId._id }).sort(
        "-date"
    );
    let userActivities = await Activity.find({
            userId: currentUserId._id,
        })
        .populate("post")
        .populate("creator");
    res.status(200).render("myActivity.pug", {
        posts: usersPost,
        userActivities: userActivities,
        isLoggedIn: isLoggedIn,
    });
});

module.exports = router;