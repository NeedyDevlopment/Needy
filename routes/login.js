const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Authentication failed!");
    const isPassMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPassMatch) return res.status(401).send("Credential does not match!");
    // Set session
    const token = await jwt.sign(
        _.pick(user, ["_id", "username", "email"]),
        "MySecureKey"
    );
    req.session.token = token;
    req.session.email = user.email;
    req.session.isLoggedIn = true;
    // res.status(200).send("you login successfully");
    // res.status(200).redirect('/');
    res.redirect("/?message=lis");
});

router.get("/", (req, res, next) => {
    // res.status(200).send('Here For this action we have to Open Login Modal using Javascript!');
    message = "Please login to access this Resource!";
    res.redirect("/");
    next();
});

module.exports = router;