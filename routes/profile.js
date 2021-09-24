const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const PhotoUpload = require('../middleware/photoUpload');
const cloudinary = require("cloudinary");



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

        const username = req.body.username;
        const city = req.body.city;
        const workplace = req.body.workplace;
        const contactno = req.body.contactno;
        const post = await Post.countDocuments({ "creator._id": currentUserId });
        if (req.file) {
            //getting existing profilePhoto's cloudinary_id from database
            let profileImgCloudinaryId = (await User.findOne({ _id: currentUserId }, { photo: 1 }))
                .photo.cloudinary_id;
            //uploading to cloudinary
            let cloudinaryResult;
            try {
                if (profileImgCloudinaryId) {
                    await cloudinary.uploader.destroy(profileImgCloudinaryId);
                }
                cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
                console.log("uploaded result::");
                console.log(cloudinaryResult);
            } catch (err) {
                console.log("error occured::", err);
            }

            var newValues = {
                $set: {
                    username: username,
                    city: city,
                    companyname: workplace,
                    contact: contactno,
                    photo: {
                        url: cloudinaryResult.secure_url,
                        cloudinary_id: cloudinaryResult.public_id
                    },
                },
            };
        } else {
            var newValues = {
                $set: {
                    username: username,
                    city: city,
                    companyname: workplace,
                    contact: contactno
                },
            };

        }
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
            // const updateUsernameinPost = await Post.updateMany({ "creator._id": currentUserId }, {
            //     $set: {
            //         "creator.username": username
            //     }
            // });
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