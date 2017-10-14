/*jshint esversion: 6 */
const http = require('http');
const url = require('url');
const port = 8000;
const handlers = require('./handlers');
let environment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config');
database(config[environment]);
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