const controllers = require('../controllers');

module.exports = (app) => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    
    app.all('*', (req,res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

}