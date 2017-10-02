/*jshint esversion: 6 */
const http = require('http');
const url = require('url');
const port = 1337;
const handlers = require('./handlers/index');

http.createServer((request,response) => {
    //let urlObj = url.parse(request.url);

    //the request is object
    request.path = url.parse(request.url).pathname;
    
    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        let result = handler(request, response);

        if(!result){
            break;
        }
    }

}).listen(port);

console.log(`Server listenning on ${port}`);
