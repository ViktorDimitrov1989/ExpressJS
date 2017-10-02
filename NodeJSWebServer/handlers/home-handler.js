/*jshint esversion: 6 */
const fs = require('fs');

module.exports = (request, response) => {
    if(request.path === '/'){
        fs.readFile('./index.html', (err,data) => {
            if(err){
                console.log(err);
                //create function to return html with 404 response - prevent cycle
                return;
            }
    
            response.writeHead(200, {
                'content-type': 'text/html'
            });
    
            response.write(data);
            response.end();
        });
    }else {
        return true;
    }

};