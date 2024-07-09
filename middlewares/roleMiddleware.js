module.exports.checkAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    req.flash('errorMessage', 'You do not have permission to access this resource.');
    res.redirect('/');
};
