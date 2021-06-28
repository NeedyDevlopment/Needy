const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const User = require("../models/user");

const webEmail = "forexternaluse505@gmail.com";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: webEmail,
        pass: "ashwin99999@",
    },
});

function generateOTP() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

var OTP;
//For sending the OTP To the email
router.post("/sendOTP", async(req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
        res.send({ error: "User Not Exists ! Please Check Email Once." });
        return;
    } else {
        OTP = generateOTP();
        var mailOptions = {
            from: webEmail,
            to: req.body.email,
            subject: "OTP For Forgot Password",
            text: OTP,
        };
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                res.send({ error: "Something Went Wrong ! Please Try Again" });
                return;
            } else {
                res.send({ success: "Email Sent" });
                return;
            }
        });
    }
});
//check OTP
router.post("/checkOTP", async(req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
        res.send({ error: "User Not Exists ! Please Check Email Once." });
        return;
    } else {
        if (OTP == req.body.OTP) {
            res.send({ success: "OTP is Valid" });
            return;
        } else {
            res.send({ error: "OTP is Not Valid" });
            return;
        }
    }
});

module.exports = router;