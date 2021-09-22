const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    // req.session.isAdmin = true;
    const params = {};
    res.status(200).render("signup.pug", params);
});
router.post("/", async(req, res) => {
    // if (req.session.token) {
    //     res.send('You are tring to create multiple account on this device which is against policy! If you want to continue on this action you have to Delete Existed Account.');
    //     res.end();
    // }
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(403).send("User already registered.");
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        companyname: req.body.work,
        city: req.body.city,
        contact: req.body.contact,
    });

    const result = await user.save();
    console.log(result);
    // const token = await jwt.sign(_.pick(result, ['_id', 'username', 'email', 'city', 'companyname']), process.env.auth_jwtPrivateKey);
    const token = await jwt.sign(
        _.pick(result, ["_id", "username", "email"]),
        "MySecureKey"
    );
    req.session.token = token;
    req.session.email = user.email;
    req.session.isLoggedIn = true;
    // res.send(req.body);
    message = "You Signup Successfully.";
    res.redirect("/?message=ss");
});
module.exports = router;