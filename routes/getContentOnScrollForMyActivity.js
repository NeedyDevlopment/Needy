const express = require("express");
const router = express.Router();
const { AuthForLogin } = require("../middleware/auth");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const Activity = require("../models/userActivity");

router.post("/getPosts", async (req, res, next) => {
  let currentPage = req.body.currentPage;
  const isLoggedIn = req.session.isLoggedIn;
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  const usersPost = await Post.find({ creator: currentUserId._id })
    .populate("creator")
    .skip(5 * (currentPage - 1))
    .limit(5)
    .sort("-date");
  res.status(200).render("dynamicPostForMyActivity.pug", {
    posts: usersPost,
  });
});
router.post("/getActivities", async (req, res, next) => {
  let currentPage = req.body.currentPage;
  const isLoggedIn = req.session.isLoggedIn;
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  const userActivities = await Activity.find({ userId: currentUserId._id })
    .skip(12 * (currentPage - 1))
    .limit(12)
    .populate("post")
    .populate("creator")
    .sort("-date");
  console.log(userActivities);
  res.status(200).render("dynamicActivityForMyActivity.pug", {
    userActivities: userActivities,
  });
});

module.exports = router;
