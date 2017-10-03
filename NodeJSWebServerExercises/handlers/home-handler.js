/*jshint esversion: 6 */
const fs = require('fs');
const mainPagePath = './views/home.html';

module.exports = (request, response) => {
    if(request.path === '/'){
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
        return true;
    }
};


