/*jshint esversion: 6 */
const fs = require('fs');
const favicoIco = '/favicon.ico';
const errHandler = require('./error-handler.js');

module.exports = (request,response) => {
    
    if(request.path === favicoIco){
        fs.readFile('./public/images' + favicoIco, (err, data) => {
            if(err){
                errHandler.handleError(request, response);
                return;
            }

            response.writeHead(200, {
                'content-type': 'image/x-icon'
            });

            response.write(data);
            response.end();
        });
    }else{
        return true;
    }

};



