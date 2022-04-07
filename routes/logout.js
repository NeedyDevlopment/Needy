const express = require("express");
const { rawListeners } = require("npm");
const router = express.Router();

router.get("/", async (req, res) => {
  // res.cookie('isLoggedIn', false, { expires: new Date(253402300000000), overwrite: true, secure: false, httpOnly: true })
  // delete req.session.isLoggedIn;
  req.session.isLoggedIn = await false;
  // res.status(200).send("you logout successfully");
  // message = "You logout Successfully.";
  res.redirect("/?message=los");
});

module.exports = router;
