const encryprtion = require('../utils/encryprtion');
const User = require('../models/User');

module.exports = {

    registerPost: async (req, res) => {
        const reqUser = req.body;

        const salt = encryprtion.generateSalt();
        const passwordhashed =
            encryprtion.generateHashedPassword(salt, reqUser.password);

        try {
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
                    res.render('users/loginRegister');
                }else{
                    res.redirect('/')
                }
            })
        } catch (err) {
            console.log(err);
            res.locals.globalError = err;
            res.render('users/loginRegister');
        }

        //async/await == .then().catch(err)

    },
    logout: (req,res) => {
        req.logout();
        res.redirect('/');
    },
    loginPost: async (req,res) => {
        const reqUser = req.body;
        //console.log(reqUser);
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
            res.render('users/loginRegister');
        }

    },
    loginGet: (req,res) => {
        res.render('users/loginRegister');
    },
    profile: (req, res) => {
        let name = req.params.username;
        User.findOne({username: name}).populate('hotels').populate('comments').then((user) => {
            console.log(user);
            res.render('users/profile', {user: user, hotels: user.hotels, comments: user.comments});
        })
    }

}