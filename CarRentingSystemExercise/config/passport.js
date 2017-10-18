const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalPassport((username, password, callback) => {
        User.findOne({ username: username }).then(user => {
            if (!user) return callback(null, false)
            if (!user.authenticate(password)) return callback(null, false)
            return callback(null, user)
        });
    }));

    passport.serializeUser((user, callback) => {
        if (user) return callback(null, user._id);
    });

    passport.deserializeUser((id, callback) => {
        User.findById(id).then(user => {
            if (!user) return callback(null, false);
            return callback(null, user);
        });
    });
}


