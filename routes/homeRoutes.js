const express = require('express');
const router = express.Router();

router.get("/", function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return res.redirect("/admin");
    } else if (req.isAuthenticated()) {
        return res.render("home.ejs", { name: req.user.name });
    } else {
        return res.redirect("/");
    }
});

module.exports = router;
