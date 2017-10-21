const controllers = require('../controllers');
const auth = require('../utils/auth');


module.exports = (app) => {

    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);

    //login/OUT
    app.post('/logout', controllers.user.logout);
    app.get('/loginRegister', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    //register
    app.post('/register', controllers.user.registerPost);
    //header button routes
    app.get('/addHotel', auth.isAuthenticated, controllers.hotel.addGet);
    app.post('/addHotel', auth.isAuthenticated, controllers.hotel.addPost);
    //list hotels
    app.get('/list', controllers.hotel.list);
    //hoteldetails
    app.get('/details', controllers.hotel.detDetails);
    //comment hotel
    app.post('/comment/:id', auth.isAuthenticated, controllers.hotel.addComment);
    //user profile
    app.get('/profile/:username', auth.isAuthenticated, controllers.user.profile);
    //like hotel
    app.get('/like/:id', controllers.hotel.like);
    //categories
    app.get('/addCategories', auth.hasRole('Admin'), controllers.category.addGet);
    app.post('/addCategories', auth.hasRole('Admin'), controllers.category.addPost);
    app.get('/delete/:category', auth.hasRole('Admin'), controllers.category.deleteCategory);
    app.get('/categories', controllers.category.listCategories);
    app.get('/list/:category', controllers.hotel.listByCategory);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

}