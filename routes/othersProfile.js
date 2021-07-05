const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");


router.get("/", async(req, res, next) => {
    const id = req.query.id;
    const currentUserId = (
        await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"])
    )._id;
    const user = await User.findOne({ _id: id });
    const isLoggedIn = req.session.isLoggedIn;
    const post = await Post.countDocuments({ "creator._id": id });
    const likes = (
        await Post.aggregate([
            { $match: { "creator._id": id } },
            { $group: { _id: "", sum: { $sum: "$likes" } } },
        ])
    )[0].sum;
    const comments = (
        await Post.aggregate([
            { $match: { "creator._id": id } },
            { $group: { _id: "", sum: { $sum: "$comments" } } },
        ])
    )[0].sum;
    res.render("othersProfile.pug", {
        user: user,
        currentUserId: currentUserId,
        post: post,
        isLoggedIn: isLoggedIn,
        likes: likes,
        comments: comments,
    });
});

module.exports = router;