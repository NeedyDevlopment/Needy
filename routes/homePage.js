const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const getPostsArrayAndtotalPosts = require("../helper/getPostsArrayAndtotalPosts");

var message = null;
router.get("", async(req, res, next) => {
    //when coming from logout redirection getting message
    const currentPage = 1;
    if (req.query.message == "los") {
        message = "Logout Successfully.";
    }
    if (req.query.message == "urnl") {
        message = "Access Denied!";
    }
    if (req.query.message == "lis") {
        message = "Login Successfully!";
    }
    if (req.query.message == "ss") {
        message = "Signup Successfully!";
    }
    if (req.query.message == "lf") {
        message = "You Entered Wrong Credentials!";
    }
    if (req.query.message == "pas") {
        message = "Post added successfully";
    }
    //getting filter
    const selectedCategory = req.query.category;
    const selectedCity = req.query.city;
    let sort = req.query.sort;
    let selectedSort = {"date" : -1};
    switch(sort){
        case "likes":{
            selectedSort =  {"likes" : -1}
            break;
        }
        case "date":{
            selectedSort = {"date" : -1}
            break;
        }
        case "comments":{
            selectedSort = {"comments" : -1}
            break;
        }
    }
    if(!sort) sort = "date";
    //Getting CurrentUser Infirmation
    const currentUserId = req.session.token ?
        await _.pick(jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]) :
        "";
    const currentUser = req.session.token ?
        await User.findOne({ _id: currentUserId._id }) : { followingsArray: [], city: "All City" };
    // let postsArray;
    var messageToSend = message;
    message = null;
    // var totalPosts;
    if (selectedCategory && selectedCity) {
        res.cookie("currentCity", selectedCity);
        res.cookie("currentCategory", selectedCategory);
        res.cookie("sort",sort)
        const result = await getPostsArrayAndtotalPosts(
            selectedCity,
            selectedCategory,
            currentPage,
            sort
        );
        return res.status(200).render("homepage.pug", {
            posts: result.postsArray,
            sort: result.sort,
            currentUserId: currentUserId._id,
            currentUserFollowingsArray: currentUser.followingsArray,
            isLoggedIn: req.session.isLoggedIn,
            message: messageToSend,
            filter: { category: selectedCategory, city: selectedCity },
            totalPosts: result.totalPosts,
        });
    } else {
        if (req.cookies["currentCity"] && req.cookies["currentCategory"]) {
            const selectedCity = req.cookies["currentCity"];
            const selectedCategory = req.cookies["currentCategory"];
            console.log("city and category exists in cookies");
            const result = await getPostsArrayAndtotalPosts(
                selectedCity,
                selectedCategory,
                currentPage,
                sort
            );
            return res.status(200).render("homepage.pug", {
                posts: result.postsArray,
                sort: result.sort,
                currentUserId: currentUserId._id,
                currentUserFollowingsArray: currentUser.followingsArray,
                isLoggedIn: req.session.isLoggedIn,
                message: messageToSend,
                filter: { category: selectedCategory, city: selectedCity },
                totalPosts: result.totalPosts,
            });
        }
        console.log("city and category is not selected");
        // postsArray = await Post.find({ city: currentUser.city }).sort('date');
        // console.log(postsArray);
        if (currentUser.city === "All City") {
            postsArray = await Post.find()
                .populate("creator")
                .limit(5)
                .skip(5 * (currentPage - 1))
                .sort(selectedSort);
            res.cookie("currentCity", "All City");
            res.cookie("currentCategory", "All Category");
            totalPosts = await Post.count({});
        } else {
            postsArray = await Post.find({ city: currentUser.city })
                .populate("creator")
                .limit(5)
                .skip(5 * (currentPage - 1))
                .sort(selectedSort);
            totalPosts = await Post.count({ city: currentUser.city });
            if (postsArray.length == 0) {
                postsArray = await Post.find()
                    .populate("creator")
                    .limit(5)
                    .skip(5 * (currentPage - 1))
                    .sort(selectedSort);
                totalPosts = await Post.count({});
                res.cookie("currentCity", "All City");
                res.cookie("currentCategory", "All Category");
            } else {
                res.cookie("currentCity", currentUser.city);
                res.cookie("currentCategory", "All Category");
            }
        }
        // console.log(postsArray);
        return res.status(200).render("homepage.pug", {
            posts: postsArray,
            sort: sort,
            currentUserId: currentUserId._id,
            currentUserFollowingsArray: currentUser.followingsArray,
            isLoggedIn: req.session.isLoggedIn,
            message: messageToSend,
            filter: { category: "All Category", city: currentUser.city },
            totalPosts: totalPosts,
        });
    }
    // next();
});

module.exports = router;