const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dateformat = require("dateformat");
const _ = require("lodash");
const { AuthForLogin } = require("../middleware/auth");
const fs = require("fs");
const PhotoUpload = require("../middleware/photoUpload");
var nodemailer = require("nodemailer");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

emitter.on("postAdded", async(args) => {
    console.log("inside postAdded emit event:::::::");
    const followersArrayDoc = await User.findById(args.creatorId).select([
        "followersArray",
        "username",
    ]);
    console.log("FollowersArrayDoc is::::::::::::::::::::: ");
    console.log(followersArrayDoc);
    const followersArray = followersArrayDoc.followersArray.map((stringId) =>
        mongoose.Types.ObjectId(stringId)
    );
    const creatorUsername = followersArrayDoc.username;
    console.log("followersArray with objecId");
    console.log(followersArray);
    const followersDoc = await User.find({
        _id: {
            $in: followersArray,
        },
    });
    console.log("followersDoc::::");
    console.log(followersDoc);
    const followers = followersDoc.map((follower) => {
        return { email: follower.email, username: follower.username };
    });
    console.log(followers);
    //sending mail
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "forexternaluse505@gmail.com",
            pass: "myStrongPassword9@",
        },
    });

    var msg = {
        from: "forexternaluse505@gmail.com",
        // to: 'ahpatel99999@gmail.com',
        // subject: 'Hello From Needy!',
        // text: 'That was easy!'
    };
    followers.forEach(function(follower, i, array) {
        msg.subject = "Hello " + follower.username;
        msg.to = follower.email;
        msg.text = creatorUsername + " Added new Post. Check Out it!";
        transporter.sendMail(msg, function(err) {
            if (err) {
                console.log("Sending to " + follower.email + " failed: " + err);
                return;
            } else {
                console.log("Mail Succssfully Sent to " + follower.email);
            }
        });
    });
});

//CREATEPOST
router.get("/", AuthForLogin, (req, res, next) => {
    res.render("createpost.pug", { isLoggedIn: req.session.isLoggedIn });
    next();
});

router.post("/", PhotoUpload.uploadPostImage, async(req, res, next) => {
    let cloudinaryResult;
    try {
        cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
        console.log("uploaded result::");
        console.log(cloudinaryResult);
    } catch (err) {
        console.log("error occured::", err);
    }


    const currentUserId = await _.pick(
        jwt.verify(req.session.token, "MySecureKey"), ["_id"]
    );
    console.log(req.file);
    console.log("Token: ", req.session.token);
    var creator = _.pick(jwt.verify(req.session.token, "MySecureKey"), [
        "_id",
        "username",
        "email",
    ]);
    const creatorsFollowers = await User.findOne({
        _id: currentUserId._id,
    }).select("followers");
    creator.followers = creatorsFollowers.followers;

    //for image of creater in post
    // creator.photo = (
    //     await User.findOne({ _id: currentUserId._id }, { photo: 1 })
    // ).photo.url;
    // console.log(
    //     req.body.category,
    //     req.body.city,
    //     req.body.title,
    //     req.body.Description,
    //     req.body.contact
    // );
    const currentDate = dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy");
    const post = new Post({
        creator: currentUserId,
        date: currentDate,
        category: req.body.category,
        city: req.body.city,
        title: req.body.title,
        description: req.body.Description,
        contact: req.body.contact,
        // image: {
        //     data: fs.readFileSync(path.join('D:/usersPost', req.file.originalname)),
        //     contentType: req.file.mimetype
        // }
        // image: "./static/usersPost/" + currentUserId._id + req.file.originalname,
        image: {
            url: cloudinaryResult.secure_url,
            cloudinary_id: cloudinaryResult.public_id
        }
    });
    const result = await post.save();
    emitter.emit("postAdded", { creatorId: creator._id });
    // res.status(200).send(result);
    // const params = {
    //     data: post.image.data,
    //     contentType: post.image.contentType,
    // };
    // res.status(200).render('createpostSubmission', params);
    message = "post added successfully.";
    res.redirect("/");
    next();
});

module.exports = router;