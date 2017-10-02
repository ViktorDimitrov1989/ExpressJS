/*jshint esversion: 6 */
const fs = require('fs');

module.exports = (request, response) => {

    let path = request.path;
    
    if (path.startsWith('/content')) {
        console.log(path);
        fs.readFile('.' + path, (err, data) => {
            console.log(data);
            if (err) {
                console.log(err);
                return;
            }

            if (path.endsWith('.css')) {
                response.writeHead(200, {
                    'content-type': 'text/css'
                });
            } else if (path.endsWith('.js')) {
                response.writeHead(200, {
                    'content-type': 'application/javascript'
                });
            }

            response.write(data);
            response.end();
            
        });

    } else {
        fs.readFile('./error.html', (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            response.writeHead(404, {
                'content-type': 'text/html'
            });

            response.write(data);
            response.end();
        });
    }
};