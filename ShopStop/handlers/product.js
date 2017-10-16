/*jshint esversion: 6 */
const fs = require('fs');
const path = require('path');

const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, resp) => {
    Category.find({})
        .then((categories) => {
            console.log(categories);
            resp.render('products/add', { categories });
        })
}

module.exports.addPost = (req, res) => {
    let product = req.body;

    product.image = '\\' + req.file.path;
    console.log(product);
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