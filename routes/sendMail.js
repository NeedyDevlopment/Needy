const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Activity = require("../models/userActivity");
var nodemailer = require("nodemailer");
const dateformat = require("dateformat");

router.post("/", (req, res, next) => {
    const currentUser = req.session.token ?
        jwt.verify(req.session.token, process.env.jwtPrivateKey) :
        null;
    const emailTo = req.body.emailTo;
    const postId = req.body.postId;
    // let verifier = new Verifier("forexternaluse505@gmail.com", "ahpatel9@");
    // verifier.verify(emailTo, (err, data) => {
    //     console.log("email verifier error" + err);
    //     console.log("email verifier data is::" + data);
    // });
    // async function isEmailValid(email) {
    //     return emailValidator.validate(email)
    // }
    // console.log("email check", isEmailValid(emailTo));
    // emailValidator.validate(emailTo).then(res => {
    //     console.log("email check res:::", res);
    // }).catch(err => {
    //     console.log("email check error:::", err);
    // });
    const url = "http://needy24x7.herokuapp.com/post/" + postId;
    if (!currentUser) {
        return res.status(401).json({ message: "You are Not registered!" });
    }

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "forexternaluse505@gmail.com",
            pass: "myStrongPassword9@",
        },
    });

    var mailOptions = {
        from: "forexternaluse505@gmail.com",
        to: emailTo,
        subject: "your friend " + currentUser.username + " shared a post",
        text: "Open this url to view post: " + url,
    };

    transporter.sendMail(mailOptions, async function(error, info) {
        if (error) {
            console.log(error);
            console.log("info::::", info);
            return res.status(500).json({ message: "something went wrong!" });
        } else {
            console.log("info::::", info);
            const currentUserId = await _.pick(
                jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
            );
            console.log("successfully sent.");
            const activity = new Activity({
                userId: currentUserId._id,
                activity_action: "Shared",
                date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
                post: postId,
            });
            const activityResult = await activity.save();
            return res
                .status(200)
                .json({ message: "Post shared successfully to " + emailTo });
        }
    });
});

module.exports = router;