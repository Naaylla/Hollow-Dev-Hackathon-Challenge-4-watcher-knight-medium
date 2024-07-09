const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

router.get("/", function (req, res) {
    res.render("register.ejs");
});

router.post("/", async function (req, res) {
    try {
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
        res.redirect("/register");
    }
});

module.exports = router;
