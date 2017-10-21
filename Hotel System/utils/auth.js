module.exports = {
    isAuthenticated: (req, res, next) => {

        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/loginRegister');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.locals.globalError = 'You dont have permission for this action!';
            res.render('home/index');
        }
    }

}