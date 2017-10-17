//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
mongoose.Promise = global.Promise;
//set global variables
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
//declare app
const app = express();
//set view-engine to work with
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//declare the folder with static files in it
app.use(express.static('./static'))


app.get('/', (req, res) => {
    res.render('home/index');
});

//run the server
mongoose.connect('mongodb://localhost:27017/exam-skeleton-db')
    .then(() => {
        console.log('DB ready!');
        app.listen(port);
        console.log('Listening on port ' + port)
    });


