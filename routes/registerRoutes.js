const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

router.get("/", function (req, res) {
    res.render("register.ejs", { errorMessage: req.flash('errorMessage') });
});

router.post("/", async function (req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('errorMessage', 'Email is already used.');
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
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
