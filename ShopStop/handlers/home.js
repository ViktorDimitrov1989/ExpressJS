/*jshint esversion: 6 */
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

module.exports.index = (request, response) => {
    let queryData = request.query;

    Product.find({})
        .populate('category')
        .then(products => {

            if (queryData.query) {
                let criteria = queryData.query.toLowerCase();
                products = products.filter(product => {
                    product.name.toLowerCase().includes(queryData.query)
                });
            }

            let data = { products: products }
            if (request.query.error) {
                data.error = request.query.error;
            } else {
                data.success = request.query.success;
            }

            response.render('home/index', data);

        });
}



