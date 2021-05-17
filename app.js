const post = require("./static/script/post");
const express = require("express");
const path = require("path");
const app = express();
const port = 80;

//Express specific stuff here
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF HERE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//ENDPOINTS
app.get("/", (req, res) => {
  const params = { likes: 10, comments: 20 };
  res.status(200).render("myActivity.pug", params);
});
//POST_SYNTEX
app.get("/post", (req, res) => {
  console.log(post.likes, post.comments);
  const params = { likes: post.likes, comments: post.comments };
  res.status(200).render("post.pug", params);
});

//start server
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
