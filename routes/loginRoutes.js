const express = require('express');
const router = express.Router();
const passport = require("passport");
const { checkUnauthenticated } = require('../middlewares/authMiddleware');

router.get("/", checkUnauthenticated, function (req, res) {
    res.render("login.ejs");
});

router.post("/", checkUnauthenticated, passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
}));

module.exports = router;
