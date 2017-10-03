/*jshint esversion: 6 */
const fs = require('fs');
const addMovieHtmlPath = './views/addMovie.html';

module.exports = (request, response) => {
    let path = request.path;

    if(path.startsWith('/addMovie')){
        fs.readFile(addMovieHtmlPath, (err,data) => {

            if(err){
                console.log(err);
                return;
            }

            response.writeHead(200, {
                'content-type': 'text/html'
            });

            response.write(data);
            response.end();
        });
    }else{
        return true;
    }

}
