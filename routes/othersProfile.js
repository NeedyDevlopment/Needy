const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

router.get("/", async(req, res, next) => {
    const id = req.query.id;
    const currentUserId = (
        await _.pick(jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"])
    )._id;
    const user = await User.findOne({ _id: id });
    const isLoggedIn = req.session.isLoggedIn;
    const post = await Post.countDocuments({ creator: id });
    const posts = await Post.find({ creator: id });
    let likes = 0;
    let comments = 0;
    posts.forEach((element) => {
        likes += element.likes;
        comments += element.comments;
    });
    console.log(comments, likes);
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