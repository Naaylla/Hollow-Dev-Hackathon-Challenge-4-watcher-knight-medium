function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/");
}

function checkUnauthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect("/home");
    }
    next();
}

module.exports = { checkAuthenticated, checkUnauthenticated };
