/*jshint esversion: 6 */
const fs = require('fs');
const mainPagePath = './views/home.html';
const errHandler = require('./error-handler.js');

module.exports = (request, response) => {
    if(request.path === '/' && request.method === 'GET'){
        fs.readFile(mainPagePath, (err,data) => {
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
        //errHandler.handleError(request, response);
        return true;
    }
};


