/*jshint esversion: 6 */
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const multiparty = require('multiparty');
const shortid =  require('shortid');
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
        });

    }else if(pathname === '/product/add' && req.method === 'POST'){
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {
            
            if(part.filename){
                let dataString = '';

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                })

                part.on('end', () => {
                    let filename = shortid.generate();

                    let filePath = './content/images/' + filename;

                    product.image = filePath;
    
                    fs.writeFile(`${filePath}.jpg`, dataString, {encoding: 'ascii'}, (err) => {

                        if(err){
                            console.log(err);
                            return;
                        }

                        console.log('file saved');

                    })
                })

            }else{
                part.setEncoding('utf8');
                let field = '';
                
                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    product[part.name] = field;
                }) 
            }
        })


        form.on('close', () => {
            database.products.add(product);

            resp.writeHead(302, {
                Location: '/'
            });

            resp.end();
        });

        form.parse(req);
    }else{
        //warning
        resp.end();
        return true;
    }
} 
