/*jshint esversion: 6 */
const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (request, response) => {
    request.pathname = request.pathname || url.parse(request.url).pathname;

    if(request.pathname === '/' && request.method === 'GET'){
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {
            if(err){
                console.log(err);
                response.writeHead(404, {
                    'content-type': 'text/plain'
                });

                response.write(data);
                response.end();
                return;
            }

            response.writeHead(200, {
                'content-type': 'text/html'
            });

            response.write(data);
            response.end();

        });

        //TODO
    }else{
        return true;
    }



}



