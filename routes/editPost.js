const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/:action", (req, res, next) => {
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
        Post.findOneAndDelete({ _id: postId })
            .then(async(result) => {
                console.log("Deleteresult::::");
                console.log(result);
                res.status(200).json({ message: "Post Deleted Successfully" });
                const deleteActivity = await Activity.deleteMany({ post: postId });
                // if (result.n > 0) {
                //   res.status(200).json({ message: "Post Updated Successfully." });
                // } else {
                //   res.status(500).json({ message: "Post does not Updated Successfully." });
                // }
            })
            .catch((error) => {
                res.status(500).json({ message: "error occured!" });
            });
    }
});

module.exports = router;