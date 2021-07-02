const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.status(200).render("contact.pug", { isLoggedIn: isLoggedIn });
    // next();
});
router.post("/", async(req, res, next) => {
    const userEmail = req.body.email;
    const subject = req.body.subject;
    const description = req.body.desc;

    const contact = new Contact({
        useremail: userEmail,
        subject: subject,
        description: description
    });
    const result = await contact.save();
    console.log("contact saved Successfully");
    res.status(200).redirect("/contact");
    next();
});

module.exports = router;