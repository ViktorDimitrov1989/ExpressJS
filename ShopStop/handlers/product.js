/*jshint esversion: 6 */
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const database = require('./../config/database.js');

module.exports = (req, resp) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    let pathname = req.pathname;

    if(pathname === '/product/add' && req.method === 'GET'){
        let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'));

        fs.readFile(filePath, (err, data) => {
            
            if(err){
                console.log(err);
                return;
            }

            resp.write(data);
            resp.end();
        })
    }else{
        return true;
    }
} 
