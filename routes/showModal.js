const express = require("express");
const router = express.Router();

router.post("/loginModal", async(req, res, next) => {
    res.render("login.pug");
});

// Forgot password post request
router.post("/forgotPassword", async(req, res, next) => {
    res.render("forgotPassword.pug");
});

//emailModal
router.post("/emailModal", async(req, res, next) => {
    res.render("emailModal.pug");
});

//Reset Password Modal Show
router.post("/displayResetPassword", async(req, res, next) => {
    var email = req.body.email;
    res.render("resetPassword.pug", { email: email });
});
//change Password Modal Show
router.post("/changePasswordModal", async(req, res, next) => {
    // var email = req.body.email;
    res.render("changepasswordmodal.pug");
});

module.exports = router;