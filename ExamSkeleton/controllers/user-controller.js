const encryprtion = require('../utils/encryprtion');
const User = require('../models/User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },

    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryprtion.generateSalt();
        const passwordhashed =
            encryprtion.generateHashedPassword(salt, reqUser.password);

        try {

            if(reqUser.password === '' || reqUser.password.match(/(\s)/)){
                throw new Error('Password cant have empty sapces!')
            }

            const user = await User.create({
                username: reqUser.username,
                hashedPass: passwordhashed,
                salt: salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });

            req.logIn(user, (err, user) => {
                if(err){
                    res.locals.globalError = err;
                    res.render('users/register');
                }else{
                    res.redirect('/')
                }
            })
        } catch (err) {
            console.log(err);
            res.locals.globalError = err;
            res.render('users/register');
        }

        //async/await == .then().catch(err)

    },
    logout: (req,res) => {
        req.logout();
        res.redirect('/');
    },
    loginPost: async (req,res) => {
        const reqUser = req.body;

        try {
            const user = await User.findOne({username: reqUser.username});

            if(!user){
                errorhandler('Invalid user data');
                return;
            }
            if(!user.authenticate(reqUser.password)){
                errorhandler('Invalid user data');
                return;
            }

            req.logIn(user, (err, user) => {

                if(err){
                    errorhandler(err);
                }else{
                    res.redirect('/')
                }
            })
        } catch (err) {
           errorhandler(err);
        }

        function errorhandler(reason){
            console.log(reason);
            res.locals.globalError = reason;
            res.render('users/login');
        }

    },
    loginGet: (req,res) => {
        res.render('users/login');
    }

}