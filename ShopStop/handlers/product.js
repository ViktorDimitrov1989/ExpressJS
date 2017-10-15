/*jshint esversion: 6 */
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const multiparty = require('multiparty');
const shortid = require('shortid');

const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = (req, resp) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    let pathname = req.pathname;

    if (pathname === '/product/add' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'));

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            Category.find({})
                .then((categories) => {
                    let replacement = '<select class="input-field" name="category">';

                    for (let cat of categories) {
                        console.log(cat.name);
                        replacement += `$<option value="${cat._id}">${cat.name}</option>`;
                    }

                    replacement += `</select>`;

                    let html = data.toString().replace('{categories}', replacement);

                    resp.writeHead(200, {
                        'content-type': 'text/html'
                    });

                    resp.write(html);
                    resp.end();

                })



        });

    } else if (pathname === '/product/add' && req.method === 'POST') {
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {

            if (part.filename) {
                let dataString = '';

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                })

                part.on('end', () => {
                    let filename = shortid.generate();

                    let filePath = './content/images/' + filename;

                    product.image = filePath;

                    fs.writeFile(`${filePath}.jpg`, dataString, { encoding: 'ascii' }, (err) => {

                        if (err) {
                            console.log(err);
                            return;
                        }

                    })
                })

            } else {
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
            Product.create(product)
                .then((insertedProduct) => {
                    Category.findById(product.category)
                        .then(category => {
                            category.products.push(product.category);
                            console.log(product);
                            category.save();
                            
                            resp.writeHead(302, {
                                Location: '/'
                            });

                            resp.end();
                        });
                });
        });

        form.parse(req);
    } else {
        return true;
    }
} 
