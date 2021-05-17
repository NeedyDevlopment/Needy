const post = require('./views/ashwin/post');
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
    const params = {};
    res.status(200).render("myActivity.pug", params);
});
//POST_SYNTEX
app.get("/post", (req, res) => {
    console.log(post.likes, post.comments);
    const params = { likes: post.likes, comments: post.comments };
    res.status(200).render("ashwin/post.pug", params);
});

//start server
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
});