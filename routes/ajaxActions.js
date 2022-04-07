const User = require("../models/user");
const Post = require("../models/post");
const Activity = require("../models/userActivity");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dateformat = require("dateformat");
const _ = require("lodash");
const EventEmitter = require("events");
const emitter = new EventEmitter();

// emitter.on("Followed", async(args) => {
//     console.log("event listened");
//     const result = await Post.updateMany({ "creator._id": args.creatorId }, {
//         $inc: {
//             "creator.followers": 1,
//         },
//     });
//     console.log("after followed updating:::::::::::::::::::::::::::::::::::::");
//     console.log(result);
// });
// emitter.on("Unfollowed", async(args) => {
//     console.log("event listened");
//     const result = await Post.updateMany({ "creator._id": args.creatorId }, {
//         $inc: {
//             "creator.followers": -1,
//         },
//     });
//     console.log("after unfollowed updating");
//     console.log(result);
// });

router.post("/:action", async(req, res, next) => {
    console.log("inside ajax endpoint");
    const action = req.params.action;
    console.log("action is::" + action);
    if (!req.session.isLoggedIn && action != "getcomment") {
        //here if user is not logged in user can see all comments but do not add comment
        console.log("you are not logged in");
        return res.status(401).json({ message: "user-not-loggedIn" });
    }
    const currentUserId = await _.pick(
        jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
    );
    if (req.params.action === "like") {
        console.log("inside like action::::::::::");
        const postId = req.body.postId;
        const incLikes = req.body.incLikes;
        var result;
        if (incLikes == 1) {
            console.log("inside if block");
            result = await Post.findByIdAndUpdate(
                postId, {
                    $inc: {
                        likes: incLikes,
                    },
                    $addToSet: { likedArray: currentUserId._id },
                }, { new: true }
            );
            const activity = new Activity({
                userId: currentUserId._id,
                activity_action: "liked",
                date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
                post: postId,
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
                postId, {
                    $inc: {
                        likes: incLikes,
                    },
                    $pull: { likedArray: currentUserId._id },
                }, { new: true }
            );
            const activity = new Activity({
                userId: currentUserId._id,
                activity_action: "unliked",
                date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
                post: postId,
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
            postId, {
                $addToSet: { savedArray: currentUserId._id },
            }, { new: true }
        );
        var result2 = await User.findByIdAndUpdate(
            currentUserId._id, {
                $addToSet: { savedPosts: postId },
            }, { new: true }
        );
        const activity = new Activity({
            userId: currentUserId._id,
            activity_action: "saved",
            date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
            post: postId,
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
        var result = await Post.findById(postId)
            .populate("commentedArray.user")
            .select("commentedArray");
        console.log("result of getting comment is:;;");
        console.log(result.commentedArray);
        return res.status(200).send(_.sortBy(result.commentedArray, "date"));
    } else if (req.params.action === "addcomment") {
        console.log("inside addcomment action::::::::::");
        const postId = req.body.postId;
        const commentText = req.body.commentText;
        var commentedBy = await User.findOne({ _id: currentUserId._id }).select(
            "username photo"
        );
        var result = await Post.findByIdAndUpdate(
            postId, {
                $push: {
                    commentedArray: {
                        user: currentUserId,
                        commentText: commentText,
                        date: Date.now(),
                    },
                },
                $inc: {
                    comments: 1,
                },
            }, { new: true }
        );
        const activity = new Activity({
            userId: currentUserId._id,
            activity_action: "commented",
            commentText: commentText,
            date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
            post: postId,
        });
        const activityResult = await activity.save();
        var result1 = await Post.findByIdAndUpdate(
            postId, {
                $addToSet: { commentedArrayWithOnlyUserId: currentUserId._id },
            }, { new: true }
        );
        console.log("result of adding comment is:;;");
        console.log(result);
        return res.status(200).send(result);
    } else if (req.params.action === "Follow") {
        const creatorId = req.body.creatorId;
        const currentUserId = await _.pick(
            jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
        );
        if (creatorId === currentUserId._id) {
            return res.status(401).json({ message: "same-user" });
        }
        const postId = req.body.postId;
        console.log("creator id is" + creatorId);
        try {
            var result = await User.findByIdAndUpdate(
                creatorId, {
                    $addToSet: {
                        followersArray: currentUserId._id,
                    },
                    $inc: {
                        followers: 1,
                    },
                }, { new: true }
            );
        } catch (error) {
            console.log("error is:::");
            console.log(error);
        }
        emitter.emit("Followed", { creatorId: creatorId });
        const anotherResult = await User.findOneAndUpdate({ _id: currentUserId._id }, {
            $addToSet: {
                followingsArray: creatorId,
            },
            $inc: {
                followings: 1,
            },
        }, { new: true });
        // const anotherResult2 = await Post.find({ creator._id: creatorId });
        const activity = new Activity({
            userId: currentUserId._id,
            activity_action: "followed",
            date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
            post: postId,
            creator: creatorId,
        });
        const activityResult = await activity.save();
        console.log("activity result is:::");
        console.log(activityResult);
        console.log("Result after following::::");
        console.log(result);
        res.status(200).send(result.followers + "");
    } else if (req.params.action === "Unfollow") {
        const creatorId = req.body.creatorId;
        const postId = req.body.postId;
        try {
            var result = await User.findByIdAndUpdate(
                creatorId, {
                    $pull: {
                        followersArray: currentUserId._id,
                    },
                    $inc: {
                        followers: -1,
                    },
                }, { new: true }
            );
        } catch (error) {
            console.log("error is:::");
            console.log(error);
        }
        emitter.emit("Unfollowed", { creatorId: creatorId });
        const anotherResult = await User.findOneAndUpdate({ _id: currentUserId._id }, {
            $pull: {
                followingsArray: creatorId,
            },
            $inc: {
                followings: -1,
            },
        }, { new: true });
        const activity = new Activity({
            userId: currentUserId._id,
            activity_action: "unfollowed",
            date: dateformat(Date.now(), "hh:MM:ss, dd mmmm, yyyy"),
            post: postId,
            creator: creatorId,
        });
        const activityResult = await activity.save();
        console.log("activity result is:::");
        console.log(activityResult);
        console.log("Result after Unfollowing::::");
        console.log(result);
        res.status(200).send(result.followers + "");
    }
});

module.exports = router;