function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/");
}

function checkUnauthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        if (request.user && request.user.role === 'admin') {
            return response.redirect("/admin");
        } else {
            return response.redirect("/home");
        }
    }
    next();
}

function checkAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/admin');
}


module.exports = { checkAuthenticated, checkUnauthenticated, checkAdminAuthenticated };
