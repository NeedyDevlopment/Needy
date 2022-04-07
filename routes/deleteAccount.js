const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const Activity = require("../models/userActivity");

router.get("/", async(req, res, next) => {
    const currentUserId = await _.pick(
        jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
    );
    const result = await User.findOneAndDelete({ _id: currentUserId._id }); //we can also use email which is also stored in session
    const deleteAllPost = await Post.deleteMany({ creator: currentUserId });
    const deleteAllActivities = await Activity.deleteMany({ userId: currentUserId._id });
    console.log("Deleted::::");
    console.log(result);
    req.session.destroy();
    console.log("after destroying session token is:::::");
    res.redirect("/");
});

module.exports = router;