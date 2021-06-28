const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.status(200).render("contact.pug", { isLoggedIn: isLoggedIn });
    // next();
});

module.exports = router;