const controllers = require('../controllers');
const auth = require('../utils/auth');

module.exports = (app) => {
    app.get('/', controllers.home.index);
    app.get('/about', auth.isAuthenticated, controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //Admin Func
    app.get('/addCar', auth.hasRole('Admin'), controllers.admin.addCarGet);
    app.post('/addCar', controllers.admin.addCarPost);

    //Query Func
    app.get('/viewAll', controllers.query.viewAll);

    app.all('*', (req,res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

}