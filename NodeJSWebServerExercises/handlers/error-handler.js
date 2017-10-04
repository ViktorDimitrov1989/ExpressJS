/*jshint esversion: 6 */
const fs = require('fs');

let ErrorHandler = {
    handleError: (request, response) => {
        
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
        }
};


module.exports = ErrorHandler;

