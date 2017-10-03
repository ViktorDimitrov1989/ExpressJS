/*jshint esversion: 6 */
const http = require('http');
const url = require('url');
const port = 1337;
const handlers = require('./handlers/index');

http.createServer((request, response) => {
    request.path = url.parse(request.url).pathname;

    for (let index = 0; index < handlers.length; index++) {
        let handler = handlers[index];
        
        let result = handler(request, response);
        
        if(!result){
            break;
        }
    }

}).listen(port);

console.log(`Server listening on ${port}`);

