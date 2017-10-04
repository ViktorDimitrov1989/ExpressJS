/*jshint esversion: 6 */
const fs = require('fs');
const errHandler = require('./error-handler.js');

module.exports = (request, response) => {
    let path = request.path;

    if (path.startsWith('/public')) {
        fs.readFile('.' + path, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            let okStatus = 200;
            let contentType = {};
            contentType['content-type'] = '';

            if (path.endsWith('.css') && request.method === 'GET') {
                contentType['content-type'] = 'text/css';
            } else if (path.endsWith('.html') && request.method === 'GET') {
                 contentType['content-type'] = 'text/html';
            } else if (path.endsWith('.js') && request.method === 'GET') {
                contentType['content-type'] = 'text/javascript';
            } else if (path.endsWith('.png') && request.method === 'GET') {
                contentType['content-type'] = 'text/png';
            } else if (path.endsWith('.jpg') && request.method === 'GET') {
                contentType['content-type'] = 'image/jpg';
            } else if (path.endsWith('.ico') && request.method === 'GET') {
                contentType['content-type'] = 'image/x-icon';
            }

            response.writeHead(okStatus, contentType);

            response.write(data);
            response.end();
        });

    } else {
        //errHandler.handleError(request, response);
        return true;
    }
};
