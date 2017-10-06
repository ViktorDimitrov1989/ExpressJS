/*jshint esversion: 6 */
const fs = require('fs');
const addMovieHtmlPath = './views/addMovie.html';
const errHandler = require('./error-handler.js');
const qs = require('querystring');
const db = require('./../config/dataBase.js');
const headerHandler = require('./header-handler.js');

let getCreationForm = (request, response) => {
    fs.readFile(addMovieHtmlPath, 'utf8', (err, data) => {

        if (err) {
            console.log(err);
            return;
        }

        response.writeHead(200, {
            'content-type': 'text/html'
        });

        data = headerHandler.handleHeader(data);

        response.write(data);
        response.end();
    });
};

let addMovie = (request, response) => {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        //query string with values from the form
        body = Buffer.concat(body).toString();
        let movieObj = qs.parse(body);
        let isMovievalid = true;

        for (var key in movieObj) {
            if (movieObj[key] === '') {
                isMovievalid = false;
            }
        }

        if (isMovievalid) {
            db.push(movieObj);

            fs.readFile('./views/addMovie.html', (err, data) => {
                if (err) {
                    console.log(err);
                }

                data = data.toString()
                    .replace('<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
                data = headerHandler.handleHeader(data);


                response.writeHead(200, {
                    'content-type': 'text-html'
                });

                response.write(data);
                response.end();
            });
        }else{
            fs.readFile('./views/addMovie.html', (err, data) => {
                if (err) {
                    console.log(err);
                }

                data = data.toString()
                    .replace('<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');

                response.writeHead(200, {
                    'content-type': 'text-html'
                });

                response.write(data);
                response.end();
            });
        }

    });
};

module.exports = (request, response) => {
    let path = request.path;

    if (path.startsWith('/addMovie') && request.method === 'GET') {
        getCreationForm(request, response);
    } else if (request.path.startsWith('/addMovie') && request.method === 'POST') {
        addMovie(request, response);
    } else {
        //errHandler.handleError(request, response);
        return true;
    }

};
