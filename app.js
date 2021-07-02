const User = require("./models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
// const emailExistence = require('email-existence');
// const Verifier = require("email-verifier");
// const emailValidator = require('deep-email-validator');
const _ = require("lodash");
const path = require("path");
const webpush = require("web-push");
const pug = require("pug");
const app = express();
const port = 80;

//SESSION STORING
require("./helper/session")(app);
//session declaration must be declared before all routes, otherwise in routes of routes folder we cannot access req.session.isLoggedin

//Express specific stuff here
app.use("/static", express.static("static"));
app.use("/views", express.static("views"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF HERE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    res.setHeader("Service-Worker-Allowed", "/");
    next();
});

//router imports
const contactRouter = require("./routes/contact");
const myActivityRouter = require("./routes/myActivity");
const postRouter = require("./routes/post");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const deleteAccountRouter = require("./routes/deleteAccount");
const sendEmailRouter = require("./routes/sendMail");
const createPostRouter = require("./routes/createPost");
const profileRouter = require("./routes/profile");
const othersProfileRouter = require("./routes/othersProfile");
const ajaxActionsRouter = require("./routes/ajaxActions");
const getpostsRouter = require("./routes/getPosts");
const editPostRouter = require("./routes/editPost");
const getActivityPostRouter = require("./routes/getAcitivityPost");
const homePageRouter = require("./routes/homePage");
const showModalRouter = require("./routes/showModal");
const otpOperationRouter = require("./routes/otpOperation");
const pwOperationRouter = require("./routes/pwOperation");
const getContentOnScrollForMyActivityRouter = require("./routes/getContentOnScrollForMyActivity");

//using router
app.use("/contact", contactRouter);
app.use("/myactivity", myActivityRouter);
app.use("/post", postRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/deleteAccount", deleteAccountRouter);
app.use("/sendMail", sendEmailRouter);
app.use("/createPost", createPostRouter);
app.use("/profile", profileRouter);
app.use("/othersProfile", othersProfileRouter);
app.use("/ajax", ajaxActionsRouter);
app.use("/getPosts", getpostsRouter);
app.use("/editPost", editPostRouter);
app.use("/getActivityPost", getActivityPostRouter);
app.use("/", homePageRouter);
app.use("/showModal", showModalRouter);
app.use("/otpOperation", otpOperationRouter);
app.use("/pwOperation", pwOperationRouter);
app.use("/getContentOnScrollForMyActivity", getContentOnScrollForMyActivityRouter);

app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
});