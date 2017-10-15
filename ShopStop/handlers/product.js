/*jshint esversion: 6 */
const fs = require('fs');
const path = require('path');

const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, resp) => {
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
}

module.exports.addPost = (req,res) => {
    let product = req.body;

    product.image = '\\' + req.file.path;

    Product
    .create(product)
    .then((createdProduct) => {
        Category.findById(createdProduct.category)
        .then((category) => {
            category.products.push(createdProduct._id)
            category.save();
        });
        res.redirect('/');
    });


} 
