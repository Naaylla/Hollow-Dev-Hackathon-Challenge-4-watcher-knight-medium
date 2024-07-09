const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middlewares/authMiddleware');

router.delete("/", checkAuthenticated, (request, response, next) => {
    request.logOut((err) => {
        if (err) {
            return next(err);
        }
        response.redirect("/");
    });
});

module.exports = router;
