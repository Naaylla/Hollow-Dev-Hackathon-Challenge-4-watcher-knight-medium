
const express = require('express');
const router = express.Router();
const passport = require("passport");
const { checkUnauthenticated } = require('../middlewares/authMiddleware');

router.get("/", checkUnauthenticated, function (req, res) {
    res.render("login.ejs");
});

router.post("/", checkUnauthenticated, function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/');
        }
        req.logIn(user, async function (err) {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }
            if (user.role === 'admin') {
                return res.redirect('/admin');
            } else {
                return res.redirect('/home');
            }
        });
    })(req, res, next);
});

module.exports = router;
