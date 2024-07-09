const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middlewares/authMiddleware');

router.get("/", checkAuthenticated, function (request, response) {
    response.render("home.ejs", { name: request.user.name });
});

module.exports = router;
