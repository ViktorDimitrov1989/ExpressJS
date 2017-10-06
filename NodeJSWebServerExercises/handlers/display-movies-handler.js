/*jshint esversion: 6 */
const fs = require('fs');
const db = require('./../config/dataBase.js');
const viewAllHtmlPath = './views/viewAll.html';

module.exports = (request, response) => {
    let path = request.path;
    if (path.endsWith('/viewAllMovies') && request.method === 'GET') {
        fs.readFile(viewAllHtmlPath, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }
            db.sort(compare);
            let str = '';
            for (let index in db) {
                let obj = db[index];
                let uri = decodeURIComponent(obj.moviePoster);
                str += `<div class="movie">
                <a href="/movies/details/${index}">More info</a>
                <img class="moviePoster" src="${uri}"/>        
                </div>`;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', str);
            
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


