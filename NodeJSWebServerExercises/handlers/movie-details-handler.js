/*jshint esversion: 6 */
const fs = require('fs');
const db = require('./../config/dataBase.js');
const url = require('url');
const movieDetailsHtmlPath = './views/details.html';
const headerHandler = require('./header-handler.js');

module.exports = (request, response) => {
    let path = request.path;

    if (path.startsWith('/movies/details') && request.method === 'GET') {
        
        fs.readFile(movieDetailsHtmlPath, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            let id = path.substring(path.lastIndexOf('/') + 1);
            db.sort(compare);
            let obj = db[id];

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                `<div class="content">
                <img src="${unescape(obj.moviePoster)}" alt=""/>
                <h3>Title  ${obj.movieTitle}</h3>
                <h3>Year ${obj.movieYear}</h3>
                <p> ${unescape(obj.movieDescription).replace(/\+/g, ' ')}</p>
                </div>`);
            data = headerHandler.handleHeader(data);
            response.writeHead(200, {
                'content-type': 'text/html'
            });

            response.write(data);
            response.end();

        });
        
    } else {
        //response.end();

        return true;
    }

};

function compare(a, b) {
    return a.movieYear < b.movieYear;
}


