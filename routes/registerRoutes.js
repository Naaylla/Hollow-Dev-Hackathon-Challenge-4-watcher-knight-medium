const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');
const { checkUnauthenticated } = require('../middlewares/authMiddleware');


router.get("/", checkUnauthenticated, function (req, res) {
    res.render("register.ejs", { errorMessage: req.flash('errorMessage') });
});

router.post("/", checkUnauthenticated, async function (req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('errorMessage', 'Email is already registered.');
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'user'
        });
        await newUser.save();
        req.flash("successMessage", "Registered successfully!");
        res.redirect("/");


    } catch (e) {
        console.error(e);
        req.flash('errorMessage', 'An error occurred. Please try again.');
        res.redirect("/register");
    }
});

module.exports = router;
