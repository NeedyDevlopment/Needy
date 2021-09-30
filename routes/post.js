const express = require("express");
const router = express.Router();
const { AuthForRegister } = require("../middleware/auth");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");


// router.get("/", AuthForRegister, (req, res, next) => {
// console.log(post.likes, post.comments);
//     const params = { likes: post.likes, comments: post.comments };
//     res.status(200).render("post.pug", params);
//     next();
// });

router.get("/:postId", async(req, res, next) => {
    const currentUserId = req.session.token ?
        await _.pick(jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]) :
        "";
    const currentUser = req.session.token ?
        await User.findOne({ _id: currentUserId._id }) : { followingsArray: [], city: "All City" };
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("creator");
    res.status(200).render("sharePost.pug", {
        post: post,
        currentUserId: currentUserId._id,
        currentUserFollowingsArray: currentUser.followingsArray,
        isLoggedIn: req.session.isLoggedIn,
    });
    // next(); //getting err: cannot set header after sent...
});

module.exports = router;