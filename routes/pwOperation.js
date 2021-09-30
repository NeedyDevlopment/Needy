const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

//reset the password
router.post("/resetPassword", async(req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    let user = await User.findOne({ email: email });
    if (user == null) {
        res.send({ error: "User Not Exists ! Try Again ." });
        return;
    } else {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        await User.updateOne({ email: email }, { $set: { password: hashPassword } },
            function(err) {
                if (err) {
                    res.send({ error: "Something Went Wrong! Try Again" });
                    return;
                } else {
                    res.send({ success: "Password Updated SuccessFully!" });
                    return;
                }
            }
        );
    }
});
router.post("/changepassword", async(req, res, next) => {
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    const currentUserId = await _.pick(
        jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
    );

    const password = (
        await User.findOne({ _id: currentUserId._id }, { password: 1 })
    ).password;

    if (!(await bcrypt.compare(oldPassword, password))) {
        res.send({ error: "old password wrong" });
        return;
    } else {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(newPassword, salt);
        await User.updateOne({ _id: currentUserId._id }, { $set: { password: hashPassword } },
            function(err) {
                if (err) {
                    res.send({ error: "Something Went Wrong! Try Again" });
                    return;
                } else {
                    res.send({ success: "Password Updated SuccessFully!" });
                    return;
                }
            }
        );
    }
});

module.exports = router;