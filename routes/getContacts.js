const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.get("/", async(req, res, next) => {
    const contacts = await Contact.find({});
    console.log("contact fetched Successfully");
    res.status(200).send(contacts);
    next();
});

module.exports = router;