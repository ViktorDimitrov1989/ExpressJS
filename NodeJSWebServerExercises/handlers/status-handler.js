/*jshint esversion: 6 */
const fs = require('fs');
const statusHtmlPath = './views/status.html';
const headerHandler = require('./header-handler.js');
const db = require('./../config/dataBase.js');


module.exports = (request, response) => {
    let path = request.path;

    if (path.startsWith('/viewStatus') && request.method === 'GET') {
        fs.readFile(statusHtmlPath, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            response.writeHead(200, {
                'content-type': 'text/html'
            });

            data = headerHandler.handleHeader(data);
            data = data.toString().replace('<h1>{{replaceMe}}</h1>', 
            `Current amount of movies in the store is ${db.length}.`);
            response.write(data);
            response.end();

        });
    }else{
        return true;
    }




};





