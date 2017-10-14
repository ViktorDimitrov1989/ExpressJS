/*jshint esversion: 6 */
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Product = require('../models/Product');

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
            let queryData = qs.parse(url.parse(request.url).query);
            
            Product.find({})
            .then(products => {

                if(queryData.query){
                    let criteria = queryData.query.toLowerCase();
                    products = products.filter((product) => {
                        return product.name.toLowerCase() === criteria
                         || product.description.toLowerCase() === criteria;
                    });
                }
    
                let content = '';
                for (let prod of products) {
                    content += 
                    `<div class="product-card">
                        <img class="product-img" src="${prod.image}.jpg"/>
                        <h2>${prod.name}</h2>
                        <p>${prod.description}</p>
                    </div>`;
                }
    
                let html = data.toString().replace('{content}', content);
    
                response.write(html);
                response.end();

            });

           

        });

    }else{
        return true;
    }
}



