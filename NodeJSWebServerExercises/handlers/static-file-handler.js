/*jshint esversion: 6 */
const fs = require('fs');

module.exports = (request, response) => {
    let path = request.path;

    if (path.startsWith('/public')) {
        fs.readFile('.' + path, (err, data) => {
            if (err) {
                console.log(err);
                fs.readFile('./views/error.html', (err, data) => {

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
                return;
            }

            let okStatus = 200;
            let contentType = {};
            contentType['content-type'] = '';

            if (path.endsWith('.css')) {
                contentType['content-type'] = 'text/css';
            } else if (path.endsWith('.html')) {
                contentType['content-type'] = 'text/html';
            } else if (path.endsWith('.js')) {
                contentType['content-type'] = 'text/javascript';
            } else if (path.endsWith('.png')) {
                contentType['content-type'] = 'text/png';
            } else if (path.endsWith('.jpg')) {
                contentType['content-type'] = 'image/jpg';
            } else if (path.endsWith('.ico')) {
                contentType['content-type'] = 'image/x-icon';
            }

            response.writeHead(okStatus, contentType);
            response.write(data);
            response.end();
        });

    } else {

        return true;
    }
};
