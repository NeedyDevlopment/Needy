const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.get("/", async(req, res, next) => {
    const currentUserId = await _.pick(
        jwt.verify(req.session.token, "MySecureKey"), ["_id"]
    );
    const result = await User.findOneAndDelete({ _id: currentUserId._id }); //we can also use email which is also stored in session
    console.log("Deleted::::");
    console.log(result);
    req.session.destroy();
    console.log("after destroying session token is:::::");
    res.redirect("/");
});

module.exports = router;