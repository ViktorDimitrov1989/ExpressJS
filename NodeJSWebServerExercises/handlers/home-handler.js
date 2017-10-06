/*jshint esversion: 6 */
const fs = require('fs');
const mainPagePath = './views/home.html';
const errHandler = require('./error-handler.js');
const headerHandler = require('./header-handler.js');

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

            let str = headerHandler.handleHeader(data);
            
            response.write(str);
            response.end();
        });
    }else{
        //errHandler.handleError(request, response);
        return true;
    }
};


