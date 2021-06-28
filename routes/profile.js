const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const PhotoUpload = require('../middleware/photoUpload');



router.get("/", async(req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const decoded = jwt.verify(req.session.token, "MySecureKey");
    const profile = await User.findOne({ _id: decoded._id });
    const post = await Post.countDocuments({ "creator._id": decoded._id });
    res.status(200).render("profile.pug", {
        profile: profile,
        isLoggedIn: isLoggedIn,
        post: post
    });
    next();
});

//Updating the profile
router.post(
    "/",
    PhotoUpload.uploadProfileImage,
    async(req, res, next) => {
        const isLoggedIn = req.session.isLoggedIn;
        const currentUserId = await _.pick(
            jwt.verify(req.session.token, "MySecureKey"), ["_id"]
        ); // getting current user id
        const post = await Post.countDocuments({ "creator._id": currentUserId });
        let profileImg = (await User.findOne({ _id: currentUserId }, { photo: 1 }))
            .photo;
        if (req.file) {
            profileImg =
                "./static/profiles/" + currentUserId._id + req.file.originalname; // path for the stored profile images
        }
        const username = req.body.username;
        const city = req.body.city;
        const workplace = req.body.workplace;
        const contactno = req.body.contactno;
        var newValues = {
            $set: {
                username: username,
                city: city,
                companyname: workplace,
                contact: contactno,
                photo: profileImg,
            },
        };
        let message = "";
        const updation = await User.updateOne({ _id: currentUserId },
            newValues,
            function(err, res) {
                if (err) {
                    message = "Something Went Wrong";
                }
            }
        );
        const profile = await User.findOne({ _id: currentUserId._id });
        if (message === "") {
            message = "Profile Updated Successfully.";
        }
        profile.message = message;
        res.status(200).render("profile.pug", {
            profile: profile,
            isLoggedIn: isLoggedIn,
            post: post,
        });
    }
);

async function f_list(f_Array) {
    let f_Array_with_Datail = new Array();
    for (let i = 0; i < f_Array.length; i++) {
        let res = await User.findOne({ _id: f_Array[i] }, { username: 1, photo: 1, followersArray: 1 });
        f_Array_with_Datail.push(res);
    }
    return f_Array_with_Datail;
}


router.post("/showProfileFollowers", async(req, res, next) => {
    const userId = req.body.id;
    const currentUserId = (
        await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"])
    )._id;
    const followersArray = (
        await User.findOne({ _id: userId }, { followersArray: 1 })
    ).followersArray;
    f_list(followersArray).then((value) => {
        res.render("f_list.pug", {
            f_Array: value,
            header: "Followers",
            currentUserId: currentUserId,
        });
    });
});
router.post("/showProfileFollowings", async(req, res, next) => {
    const userId = req.body.id;
    const currentUserId = (
        await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"])
    )._id;
    const followingsArray = (
        await User.findOne({ _id: userId }, { followingsArray: 1 })
    ).followingsArray;
    f_list(followingsArray).then((value) => {
        res.render("f_list.pug", {
            f_Array: value,
            header: "Followings",
            currentUserId: currentUserId,
        });
    });
});


module.exports = router;