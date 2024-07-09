const express = require('express');
const router = express.Router();
const voteRoutes = require('./votesRoutes');


router.get("/", function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return res.redirect("/admin");
    } else if (req.isAuthenticated()) {
        return res.render("user.ejs", { name: req.user.name });
    } else {
        return res.redirect("/");
    }
});

router.use('/votes', voteRoutes);


module.exports = router;
