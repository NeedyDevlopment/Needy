const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const Activity = require("../models/userActivity");

router.post("/:action", async(req, res, next) => {
    const postId = req.body.editPostId;
    if (req.params.action == "Edit") {
        const editTitle = req.body.editedTitle;
        const editDesc = req.body.editedDesc;
        const editContact = req.body.editedContact;
        const editCity = req.body.editedCity;
        Post.findOneAndUpdate({ _id: postId }, {
                $set: {
                    title: editTitle,
                    description: editDesc,
                    contact: editContact,
                    city: editCity,
                },
            })
            .then((result) => {
                console.log("updateResult:::::");
                console.log(result);
                res.status(200).json({ message: "Post Updated Successfully." });
            })
            .catch((error) => {
                res.status(500).json({ message: "error occured!" });
            });
    } else if (req.params.action == "Delete") {
        const postDeleted = await Post.findOneAndDelete({ _id: postId });
        console.log("Deleteresult::::");
        console.log(postDeleted);
        const deleteActivity = await Activity.deleteMany({ post: postId });
        res.status(200).json({ message: "Post Deleted Successfully" });
        // if (result.n > 0) {
        //   res.status(200).json({ message: "Post Updated Successfully." });
        // } else {
        //   res.status(500).json({ message: "Post does not Updated Successfully." });
        // }
    }
});

module.exports = router;