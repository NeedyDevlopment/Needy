const User = require("./models/user");
const Post = require("./models/post");
const Activity = require("./models/userActivity");
// const changeStyle = require("./static/script/login");//not working
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const jwt = require("jsonwebtoken");
const dateformat = require("dateformat");
const _ = require("lodash");
const EventEmitter = require("events");
const path = require("path");
const multer = require("multer");
const webpush = require("web-push");
const pug = require("pug");
const { AuthForRegister, AuthForLogin } = require("./middleware/auth");
const fs = require("fs");
const app = express();
const port = 80;
var nodemailer = require("nodemailer");

var message = null;
const webEmail = "forexternaluse505@gmail.com";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: webEmail,
    pass: "ahpatel9@",
  },
});

//Notification
// const publicVapidkey = 'BPmCyJFvTth5VUcT4LGEVFOaLeySyptCGJ5dzqLkQGZ6Fs6DYXNubLP2u7xlQ8CAg5VlYJA7KC5nHoKoRRV3298';
// const privateVapidkey = 'innkCySAscKgt5Tl5S-P3SUpSMS9ZCEifRCIcSWhM6s';

// webpush.setVapidDetails('mailto:test@test.com', publicVapidkey, privateVapidkey);

// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;
//     res.status(201).json({});

//     const payload = JSON.stringify({ title: 'Push Test' });

//     webpush.sendNotification(subscription, payload);
// })

// var mailOptions = {
//     from: 'forexternaluse505@gmail.com',
//     to: 'ahpatel99999@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

const emitter = new EventEmitter();
emitter.on("Followed", async (args) => {
  console.log("event listened");
  const result = await Post.updateMany(
    { "creator._id": args.creatorId },
    {
      $inc: {
        "creator.followers": 1,
      },
    }
  );
  console.log("after followed updating:::::::::::::::::::::::::::::::::::::");
  console.log(result);
});
emitter.on("Unfollowed", async (args) => {
  console.log("event listened");
  const result = await Post.updateMany(
    { "creator._id": args.creatorId },
    {
      $inc: {
        "creator.followers": -1,
      },
    }
  );
  console.log("after unfollowed updating");
  console.log(result);
});

emitter.on("postAdded", async (args) => {
  const followersArrayDoc = await User.findById(args.creatorId).select([
    "followersArray",
    "username",
  ]);
  console.log("FollowersArrayDoc is::::::::::::::::::::: ");
  console.log(followersArrayDoc);
  const followersArray = followersArrayDoc.followersArray.map((stringId) =>
    mongoose.Types.ObjectId(stringId)
  );
  const creatorUsername = followersArrayDoc.username;
  console.log("followersArray with objecId");
  console.log(followersArray);
  const followersDoc = await User.find({
    _id: {
      $in: followersArray,
    },
  });
  console.log("followersDoc::::");
  console.log(followersDoc);
  const followers = followersDoc.map((follower) => {
    return { email: follower.email, username: follower.username };
  });
  console.log(followers);
  //sending mail
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "forexternaluse505@gmail.com",
      pass: "ahpatel9@",
    },
  });

  var msg = {
    from: "forexternaluse505@gmail.com",
    // to: 'ahpatel99999@gmail.com',
    // subject: 'Hello From Needy!',
    // text: 'That was easy!'
  };
  followers.forEach(function (follower, i, array) {
    msg.subject = "Hello " + follower.username;
    msg.to = follower.email;
    msg.text = creatorUsername + " Added new Post. Check Out it!";
    transporter.sendMail(msg, function (err) {
      if (err) {
        console.log("Sending to " + follower.email + " failed: " + err);
        return;
      } else {
        console.log("Sent to " + follower.email);
      }
    });
  });
});
// setTimeout(() => {
//     emitter.emit('postAdded', { creatorId: mongoose.Types.ObjectId('60ba09bdd910fc88b07d21fc') })
// }, 2000);

//SESSION STORING
const store = new MongodbSession({
  uri: "mongodb://localhost/sessions",
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
app.use("/views", express.static("views"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF HERE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.setHeader("Service-Worker-Allowed", "/");
  next();
});

//HOME
app.get("/", async (req, res, next) => {
  //when coming from logout redirection getting message
  const currentPage = 1;
  if (req.query.message) {
    message = "You Logout Successfully.";
  }
  console.log(req.header("message"));
  //getting filter
  const selectedCategory = req.query.category;
  const selectedCity = req.query.city;
  //Getting CurrentUser Infirmation
  const currentUserId = req.session.token
    ? await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"])
    : "";
  const currentUser = req.session.token
    ? await User.findOne({ _id: currentUserId._id })
    : { followingsArray: [], city: "All City" };
  let postsArray;
  var messageToSend = message;
  message = null;
  if (selectedCategory && selectedCity) {
    if (selectedCategory == "All Category" && selectedCity == "All City") {
      postsArray = await Post.find()
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    } else if (selectedCategory == "All Category") {
      postsArray = await Post.find({ city: selectedCity })
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    } else if (selectedCity == "All City") {
      postsArray = await Post.find({ category: selectedCategory })
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    } else {
      postsArray = await Post.find({
        category: selectedCategory,
        city: selectedCity,
      })
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    }
    return res.status(200).render("homepage.pug", {
      posts: postsArray,
      currentUserId: currentUserId._id,
      currentUserFollowingsArray: currentUser.followingsArray,
      isLoggedIn: req.session.isLoggedIn,
      message: messageToSend,
      filter: { category: selectedCategory, city: selectedCity },
      totalPosts: 11,
    });
  } else {
    console.log("city and category is not selected");
    // postsArray = await Post.find({ city: currentUser.city }).sort('date');
    // console.log(postsArray);
    if (currentUser.city === "All City") {
      postsArray = await Post.find()
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    } else {
      postsArray = await Post.find({ city: currentUser.city })
        .limit(5)
        .skip(5 * (currentPage - 1))
        .sort("date");
    }
    console.log(postsArray);
    return res.status(200).render("homepage.pug", {
      posts: postsArray,
      currentUserId: currentUserId._id,
      currentUserFollowingsArray: currentUser.followingsArray,
      isLoggedIn: req.session.isLoggedIn,
      message: messageToSend,
      filter: { category: "All Category", city: currentUser.city },
      totalPosts: 11,
    });
  }
  next();
});
app.get("/myactivity", AuthForLogin, async (req, res, next) => {
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  const usersPost = await Post.find({ "creator._id": currentUserId._id }).sort(
    "date"
  );
  const params = { likes: 10, comments: 20 };
  res.status(200).render("myActivity.pug", { posts: usersPost });
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
  // res.send(req.body);
  message = "You Signup Successfully.";
  res.redirect("/");
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
  // res.status(200).redirect('/');
  message = "You login Successfully.";
  res.redirect("/");
});

app.get("/login", (req, res, next) => {
  // res.status(200).send('Here For this action we have to Open Login Modal using Javascript!');
  message = "Please login First to create Post!";
  res.redirect("/");
  next();
});

//Logout
app.get("/logout", (req, res) => {
  // res.cookie('isLoggedIn', false, { expires: new Date(253402300000000), overwrite: true, secure: false, httpOnly: true })
  // delete req.session.isLoggedIn;
  req.session.isLoggedIn = false;
  // res.status(200).send("you logout successfully");
  // message = "You logout Successfully.";
  res.redirect("/?message=yes");
});

//DeleteAccount
app.get("/deleteAccount", async (req, res, next) => {
  const currentUserId = await _.pick(
    jwt.verify(req.session.token, "MySecureKey"),
    ["_id"]
  );
  const result = await User.findOneAndDelete({ _id: currentUserId._id }); //we can also use email which is also stored in session
  console.log("Deleted::::");
  console.log(result);
  req.session.destroy();
  console.log("after destroying session token is:::::");
  res.redirect("/");
});

//IMAGE UPLOAD AND STORING IN DATABASE FOR POSTS
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./static/usersPost/"),
  filename: async (req, file, cb) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
    );
    cb(null, currentUserId._id + file.originalname);
  },
});

//IMAGE UPLOAD AND STORING DATABASE FOR PROFILE
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./static/profiles/"),
  filename: async (req, file, cb) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
    );
    cb(null, currentUserId._id + file.originalname);
  },
});

//file filter for image file
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

//UPLOAD FOR POSTS
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//UPLOAD FOR PROFILE
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.post(
  "/createpostSubmission",
  upload.single("image"),
  async (req, res, next) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
    );
    console.log(req.file);
    console.log("Token: ", req.session.token);
    var creator = _.pick(jwt.verify(req.session.token, "MySecureKey"), [
      "_id",
      "username",
      "email",
    ]);
    const creatorsFollowers = await User.findOne({
      _id: currentUserId._id,
    }).select("followers");
    creator.followers = creatorsFollowers.followers;
    console.log(
      req.body.category,
      req.body.city,
      req.body.title,
      req.body.Description,
      req.body.contact
    );
    const currentDate = dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy");
    const post = new Post({
      creator: creator,
      date: currentDate,
      category: req.body.category,
      city: req.body.city,
      title: req.body.title,
      description: req.body.Description,
      contact: req.body.contact,
      // image: {
      //     data: fs.readFileSync(path.join('D:/usersPost', req.file.originalname)),
      //     contentType: req.file.mimetype
      // }
      image: "./static/usersPost/" + currentUserId._id + req.file.originalname,
    });
    const result = await post.save();
    emitter.emit("postAdded", { creatorId: creator._id });
    // res.status(200).send(result);
    const params = {
      data: post.image.data,
      contentType: post.image.contentType,
    };
    // res.status(200).render('createpostSubmission', params);
    message = "Your post added successfully.";
    res.redirect("/");
    next();
  }
);

//CREATEPOST
app.get("/createpost", AuthForLogin, (req, res, next) => {
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

//Updating the profile
app.post(
  "/profile",
  uploadProfileImage.single("profileImg"),
  async (req, res, next) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
    ); // getting current user id
    let profileImg = (await User.findOne({ _id: currentUserId }, { photo: 1 }))
      .photo;
    if (req.file) {
      profileImg =
        "./static/profiles/" + currentUserId._id + req.file.originalname; // path for the stored profile images
    }
    const username = req.body.username;
    const city = req.body.city;
    const workplace = req.body.workplace;
    const contactno = req.body.contactno;
    var newValues = {
      $set: {
        username: username,
        city: city,
        companyname: workplace,
        contact: contactno,
        photo: profileImg,
      },
    };
    let message = "";
    const updation = await User.updateOne(
      { _id: currentUserId },
      newValues,
      function (err, res) {
        if (err) {
          message = "Something Went Wrong";
        }
      }
    );
    const profile = await User.findOne({ _id: currentUserId._id });
    if (message === "") {
      message = "Profile Updated Successfully.";
    }
    profile.message = message;
    res.status(200).render("profile.pug", profile);
  }
);

app.post("/ajax/:action", async (req, res, next) => {
  console.log("inside ajax endpoint");
  const action = req.params.action;
  console.log("action is::" + action);
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
  } else if (req.params.action === "Follow") {
    const creatorId = req.body.creatorId;
    console.log("creator id is" + creatorId);
    try {
      var result = await User.findByIdAndUpdate(
        creatorId,
        {
          $addToSet: {
            followersArray: currentUserId._id,
          },
          $inc: {
            followers: 1,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log("error is:::");
      console.log(error);
    }
    emitter.emit("Followed", { creatorId: creatorId });
    const anotherResult = await User.findOneAndUpdate(
      { _id: currentUserId._id },
      {
        $addToSet: {
          followingsArray: creatorId,
        },
        $inc: {
          followings: 1,
        },
      },
      { new: true }
    );
    // const anotherResult2 = await Post.find({ creator._id: creatorId });
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
    res.status(200).send(result.followers + "");
  } else if (req.params.action === "Unfollow") {
    const creatorId = req.body.creatorId;
    try {
      var result = await User.findByIdAndUpdate(
        creatorId,
        {
          $pull: {
            followersArray: currentUserId._id,
          },
          $inc: {
            followers: -1,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log("error is:::");
      console.log(error);
    }
    emitter.emit("Unfollowed", { creatorId: creatorId });
    const anotherResult = await User.findOneAndUpdate(
      { _id: currentUserId._id },
      {
        $pull: {
          followingsArray: creatorId,
        },
        $inc: {
          followings: -1,
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
    res.status(200).send(result.followers + "");
  }
});
app.post("/getPosts", async (req, res, next) => {
  console.log("currentPage is:;:::" + req.body.currentPage);
  // return res.status(200).send("Successfully");
  const selectedCity = req.body.city;
  const selectedCategory = req.body.category;
  const currentPage = req.body.currentPage;
  const currentUserId = req.session.token
    ? await _.pick(jwt.verify(req.session.token, "MySecureKey"), ["_id"])
    : "";
  const currentUser = req.session.token
    ? await User.findOne({ _id: currentUserId._id })
    : { followingsArray: [] };
  let postaArray = [];
  let messageToSend = "";
  let totalPosts;
  // if (selectedCategory && selectedCity) {
  if (selectedCategory == "All Category" && selectedCity == "All City") {
    postsArray = await Post.find()
      .limit(5)
      .skip(5 * (currentPage - 1))
      .sort("date");
    totalPosts = await Post.count({});
  } else if (selectedCategory == "All Category") {
    postsArray = await Post.find({ city: selectedCity })
      .limit(5)
      .skip(5 * (currentPage - 1))
      .sort("date");
    totalPosts = await Post.count({ city: selectedCity });
  } else if (selectedCity == "All City") {
    postsArray = await Post.find({ category: selectedCategory })
      .limit(5)
      .skip(5 * (currentPage - 1))
      .sort("date");
    totalPosts = await Post.count({ category: selectedCategory });
  } else {
    postsArray = await Post.find({
      category: selectedCategory,
      city: selectedCity,
    })
      .limit(5)
      .skip(5 * (currentPage - 1))
      .sort("date");
    totalPosts = await Post.count({
      category: selectedCategory,
      city: selectedCity,
    });
  }
  return res.status(200).render("dynamicPost.pug", {
    posts: postsArray,
    currentUserId: currentUserId._id,
    currentUserFollowingsArray: currentUser.followingsArray,
    isLoggedIn: req.session.isLoggedIn,
    message: messageToSend,
    filter: {
      category: selectedCategory,
      city: selectedCity,
      totalPosts: 11,
    },
  });
});

//for opening login moodal
app.post("/loginModal", async (req, res, next) => {
  res.render("login.pug");
});

// Forgot password post request
app.post("/forgotPassword", async (req, res, next) => {
  res.render("forgotPassword.pug");
});

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

var OTP;
//For sending the OTP To the email
app.post("/sendOTP", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.send({ error: "User Not Exists ! Please Check Email Once." });
    return;
  } else {
    OTP = generateOTP();
    var mailOptions = {
      from: webEmail,
      to: req.body.email,
      subject: "OTP For Forgot Password",
      text: OTP,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.send({ error: "Something Went Wrong ! Please Try Again" });
        return;
      } else {
        res.send({ success: "Email Sent" });
        return;
      }
    });
  }
});

//check OTP
app.post("/checkOTP", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.send({ error: "User Not Exists ! Please Check Email Once." });
    return;
  } else {
    if (OTP == req.body.OTP) {
      res.send({ success: "OTP is Valid" });
      return;
    } else {
      res.send({ error: "OTP is Not Valid" });
      return;
    }
  }
});

//Reset Password Modal Show
app.post("/displayResetPassword", async (req, res, next) => {
  var email = req.body.email;
  res.render("resetPassword.pug", { email: email });
});

//reset the password
app.post("/resetPassword", async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  let user = await User.findOne({ email: email });
  if (user == null) {
    res.send({ error: "User Not Exists ! Try Again ." });
    return;
  } else {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      { email: email },
      { $set: { password: hashPassword } },
      function (err) {
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

//start server
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
