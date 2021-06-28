const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

router.post("/", async(req, res, next) => {
    console.log("currentPage is:;:::" + req.body.currentPage);
    // return res.status(200).send("Successfully");
    const selectedCity = req.body.city;
    const selectedCategory = req.body.category;
    const currentPage = req.body.currentPage;
    const currentUserId = req.session.token ?
        await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"]) :
        "";
    const currentUser = req.session.token ?
        await User.findOne({ _id: currentUserId._id }) : { followingsArray: [] };
    let postaArray = [];
    let messageToSend = "";
    let totalPosts;
    // if (selectedCategory && selectedCity) {
    if (selectedCategory == "All Category" && selectedCity == "All City") {
        postsArray = await Post.find()
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({});
    } else if (selectedCategory == "All Category") {
        postsArray = await Post.find({ city: selectedCity })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({ city: selectedCity });
    } else if (selectedCity == "All City") {
        postsArray = await Post.find({ category: selectedCategory })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({ category: selectedCategory });
    } else {
        postsArray = await Post.find({
                category: selectedCategory,
                city: selectedCity,
            })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({
            category: selectedCategory,
            city: selectedCity,
        });
    }
    return res.status(200).render("dynamicPost.pug", {
        posts: postsArray,
        currentUserId: currentUserId._id,
        currentUserFollowingsArray: currentUser.followingsArray,
        isLoggedIn: req.session.isLoggedIn,
        message: messageToSend,
        filter: {
            category: selectedCategory,
            city: selectedCity,
        },
        // totalPosts: 11,
        totalPosts: totalPosts,
    });
});

module.exports = router;