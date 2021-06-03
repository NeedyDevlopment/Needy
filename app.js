const post = require("./static/script/post");
const User = require("./models/user");
const Post = require("./models/post");
const Activity = require("./models/userActivity");
// const changeStyle = require("./static/script/login");//not working
const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const jwt = require("jsonwebtoken");
const dateformat = require("dateformat");
const _ = require("lodash");
const path = require("path");
const multer = require("multer");
const { AuthForRegister, AuthForLogin } = require("./middleware/auth");
const fs = require("fs");
const app = express();
const port = 80;

//SESSION STORING
const store = new MongodbSession({
  uri: "mongodb+srv://ahpatel9:ahpatel9@cluster0.ar3og.mongodb.net/Needy?retryWrites=true&w=majority",
  collection: "mysessions",
});
app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      expires: new Date(253402300000000),
    },
  })
);

//Express specific stuff here
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF HERE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//HOME
app.get("/", AuthForRegister, async (req, res, next) => {
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  const postsArray = await Post.find({}).sort("date");
  console.log(postsArray);
  console.log(req.session.token);
  console.log(req.session.isLoggedIn);
  // const params = { likes: 10, comments: 20 };
  res
    .status(200)
    .render("homepage.pug", {
      posts: postsArray,
      currentUserId: currentUserId._id,
      isLoggedIn: req.session.isLoggedIn,
    });
  console.log(currentUserId);
  // var dummyArray = ['60abba07e7471f703081aeb9'];
  // console.log(dummyArray.indexOf(currentUserId._id));
  // console.log(currentUserId._id);
  next();
});
app.get("/myactivity", AuthForRegister, async (req, res, next) => {
  const params = { likes: 10, comments: 20 };
  res.status(200).render("myActivity.pug", params);
  next();
});

//POST_SYNTEX
app.get("/post", AuthForRegister, (req, res, next) => {
  console.log(post.likes, post.comments);
  const params = { likes: post.likes, comments: post.comments };
  res.status(200).render("post.pug", params);
  next();
});

//Signup Stuff
app.get("/signup", (req, res) => {
  // req.session.isAdmin = true;
  const params = {};
  res.status(200).render("signup.pug", params);
});

app.post("/SignupSubmission", async (req, res) => {
  if (req.session.token) {
    res.send(
      "You are tring to create multiple account on this device which is against policy! If you want to continue on this action you have to Delete Existed Account."
    );
    res.end();
  }
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
  res.send(req.body);
});
//Login
app.post("/login", async (req, res) => {
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
  res.status(200).redirect("/");
});

app.get("/login", (req, res, next) => {
  res
    .status(200)
    .send("Here For this action we have to Open Login Modal using Javascript!");
  next();
});

//Logout
app.get("/logout", (req, res) => {
  // res.cookie('isLoggedIn', false, { expires: new Date(253402300000000), overwrite: true, secure: false, httpOnly: true })
  delete req.session.isLoggedIn;
  res.status(200).send("you logout successfully");
});

//DeleteAccount
app.get("/deleteAccount", async (req, res, next) => {
  const _id = jwt.verify(req.session.token, "MySecureKey");
  const result = await User.findOneAndDelete({ _id: _id }); //we can also use email which is also stored in session
  console.log("Deleted::::");
  console.log(result);
  req.session.destroy();
  console.log("after destroying session token is:::::");
  res.redirect("/");
});

//IMAGE UPLOAD AND STORING IN DATABASE

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "D://usersPost/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jfif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("image type is invalid!", false));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.post(
  "/createpostSubmission",
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.file);
    console.log("Token: ", req.session.token);
    const creator = _.pick(jwt.verify(req.session.token, "MySecureKey"), [
      "_id",
      "username",
      "email",
    ]);
    const currentDate = dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy");
    const post = new Post({
      creator: creator,
      date: currentDate,
      category: req.body.category,
      city: req.body.city,
      title: req.body.title,
      description: req.body.Description,
      contact: req.body.contact,
      image: {
        data: fs.readFileSync(path.join("D:/usersPost", req.file.originalname)),
        contentType: req.file.mimetype,
      },
    });
    const result = await post.save();
    // res.status(200).send(result);
    const params = {
      data: post.image.data,
      contentType: post.image.contentType,
    };
    res.status(200).render("createpostSubmission", params);
    next();
  }
);

//CREATEPOST
app.get("/createpost", AuthForRegister, AuthForLogin, (req, res, next) => {
  if (!fs.existsSync("D://usersPost")) {
    fs.mkdirSync("D://usersPost");
  }
  res.render("createpost.pug");
  next();
});

//Displaying ProfilePage
app.get("/profile", async (req, res, next) => {
  const decoded = jwt.verify(req.session.token, "MySecureKey");
  const profile = await User.findOne({ _id: decoded._id });
  res.status(200).render("profile.pug", profile);
  next();
});

//HANDLE Ajax Request
// app.post('/action/:postId', async(req, res, next) => {
//     console.log('inside action endpoint');
//     const postId = req.params.postId;
//     const incLikes = req.query.incLikes;
//     console.log('increment:::' + incLikes);
//     const result = await Post.findByIdAndUpdate(postId, {
//         $inc: {
//             'likes': incLikes
//         }
//     }, { new: true });

//     res.status(200).send(result.likes);
//     console.log(result);
//     console.log('after sending response:::::::::::::::::::::::');
//     console.log('after sending response:::::::::::::::::::::::');
//     console.log(result.likes);
// }) // not working
app.post("/ajax/:action", async (req, res, next) => {
  console.log("inside ajax endpoint");
  const action = req.params.action;
  if (!req.session.isLoggedIn && action != "getcomment") {
    //here if user is not logged in user can see all comments but do not add comment
    console.log("you are not logged in");
    return res.status(401).send(new Error("please First Login"));
  }
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  if (req.params.action === "like") {
    console.log("inside like action::::::::::");
    const postId = req.body.postId;
    const incLikes = req.body.incLikes;
    var result;
    if (incLikes == 1) {
      console.log("inside if block");
      result = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: {
            likes: incLikes,
          },
          $addToSet: { likedArray: currentUserId._id },
        },
        { new: true }
      );
      const activity = new Activity({
        userId: currentUserId,
        activity: "liked",
        date: Date.now(),
        postId: postId,
      });
      const activityResult = await activity.save();
      console.log("activity result:::::::");
      console.log(activityResult);
      console.log("result is:;;");
      console.log(result);
    } else {
      console.log("inside else block");
      console.log("currentUser id is: " + currentUserId);
      result = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: {
            likes: incLikes,
          },
          $pull: { likedArray: currentUserId._id },
        },
        { new: true }
      );
      const activity = new Activity({
        userId: currentUserId,
        activity: "unliked",
        date: Date.now(),
        postId: postId,
      });
      const activityResult = await activity.save();
      console.log("activity result:::::::");
      console.log(activityResult);
      console.log("result is:;;");
      console.log(result);
    }
    return res.status(200).send(result.likes + ""); //we can't send integer as response
  } else if (req.params.action === "save") {
    console.log("inside save action::::::::::");
    const postId = req.body.postId;
    var result1 = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { savedArray: currentUserId._id },
      },
      { new: true }
    );
    var result2 = await User.findByIdAndUpdate(
      currentUserId._id,
      {
        $addToSet: { savedPosts: postId },
      },
      { new: true }
    );
    const activity = new Activity({
      userId: currentUserId,
      activity: "saved",
      date: Date.now(),
      postId: postId,
    });
    const activityResult = await activity.save();
    console.log("activity result:::::::");
    console.log(activityResult);
    console.log("result1 is:;;");
    console.log(result1);
    console.log("result2 is:;;");
    console.log(result2);
    return res.status(200).send("success");
  } else if (req.params.action === "getcomment") {
    console.log("inside get comment action::::::::::");
    const postId = req.body.postId;
    var result = await Post.findById(postId).select("commentedArray");
    console.log("result of getting comment is:;;");
    console.log(result.commentedArray);
    return res
      .status(200)
      .send(_.sortBy(result.commentedArray, "date").reverse());
  } else if (req.params.action === "addcomment") {
    console.log("inside addcomment action::::::::::");
    const postId = req.body.postId;
    const commentText = req.body.commentText;
    var commentedBy = await User.findOne({ _id: currentUserId._id }).select(
      "username photo"
    );
    var result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          commentedArray: {
            userId: currentUserId._id,
            username: commentedBy.username,
            userphoto: commentedBy.photo,
            commentText: commentText,
            date: Date.now(),
          },
        },
        $inc: {
          comments: 1,
        },
      },
      { new: true }
    );
    const activity = new Activity({
      userId: currentUserId,
      activity: "commented",
      commentText: commentText,
      date: Date.now(),
      postId: postId,
    });
    const activityResult = await activity.save();
    var result1 = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { commentedArrayWithOnlyUserId: currentUserId._id },
      },
      { new: true }
    );
    console.log("result of adding comment is:;;");
    console.log(result);
    return res.status(200).send(result);
  } else if ("req.params.action" === "Follow") {
    const creatorId = req.body.creatorId;
    var result = await User.findByIdAndUpdate(
      creatorId,
      {
        $addToSet: {
          followersArray: {
            followerId: currentUserId,
          },
        },
        $inc: {
          followers: 1,
        },
      },
      { new: true }
    );
    const activity = new Activity({
      userId: currentUserId,
      activity: "followed",
      date: Date.now(),
      creatorId: creatorId,
    });
    const activityResult = await activity.save();
    console.log("activity result is:::");
    console.log(activityResult);
    console.log("Result after following::::");
    console.log(result);
    res.status(200).send(result.followers);
  } else if ("req.params.action" === "unfollow") {
    const creatorId = req.body.creatorId;
    var result = await User.findByIdAndUpdate(
      creatorId,
      {
        $pull: {
          followersArray: {
            followerId: currentUserId,
          },
        },
        $inc: {
          followers: -1,
        },
      },
      { new: true }
    );
    const activity = new Activity({
      userId: currentUserId,
      activity: "Unfollowed",
      date: Date.now(),
      creatorId: creatorId,
    });
    const activityResult = await activity.save();
    console.log("activity result is:::");
    console.log(activityResult);
    console.log("Result after Unfollowing::::");
    console.log(result);
    res.status(200).send(result.followers);
  }
});

//start server
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
