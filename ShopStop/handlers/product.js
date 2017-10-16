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


module.exports.editGet = (req, res) => {
    let id = req.params.id;

    Product
        .findById(id)
        .then((foundedProduct) => {

            if (!foundedProduct) {
                res.status(404)
                    .send('File not found');
                return;
            }

            Category.find()
                .then((categories) => {
                    res.render('products/edit', {
                        product: foundedProduct,
                        categories: categories
                    });
                });

        });
}

module.exports.editPost = (req, res) => {
    let id = req.params.id;
    let editedProduct = req.body;
    console.log(id);
    Product.findById(id)
        .then((product) => {
            if (!product) {
                res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`);
                return;
            }

            product.name = editedProduct.name;
            product.description = editedProduct.description;
            product.price = editedProduct.price;

            if (req.file) {
                product.image = '\\' + req.file.path;
            }


            if (product.category.toString() !== editedProduct.category) {
                Category.find(product.category).then((currentCategory) => {
                    Category.findById(editedProduct.category).then((nextCategory) => {
                        let index = currentCategory.products.indexOf(product._id);

                        if (index >= 0) {
                            currentCategory.products.splice(index, 1);
                        }
                        currentCategory.save();

                        nextCategory.products.push(product._id);
                        nextCategory.save();

                        product.category = editedProduct.category;

                        product
                            .save()
                            .then(() => {
                                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
                            })
                    })
                })
            } else {
                product.save().then(() => {
                    res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
                })
            }
        })
}

module.exports.removeGet = (req, res) => {
    let id = req.params.id;

    Product
        .findById(id)
        .then((productToRemove) => {
            if (!productToRemove) {
                res.status(404)
                    .send('File not found');
                return;
            }

            res.render('products/remove', { product: productToRemove });
        });
}

module.exports.removePost = (req, res) => {
    let id = req.params.id;

    Product
        .findById(id)
        .then((productToRemove) => {

            if (!productToRemove) {
                res.status(404)
                    .send('File not found');
                return;
            }

            Category.findById(productToRemove.category)
                .then((categoryToEdit) => {
                    let index = categoryToEdit.products.indexOf(productToRemove._id);

                    if (index >= 0) {
                        categoryToEdit.products.splice(index, 1);
                    }

                    categoryToEdit
                        .save()
                        .then(() => {
                            productToRemove.remove().then(() => {
                                removePicture(productToRemove.image);
                                res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully!')}`);
                            });
                        });
                });


        });

}

module.exports.buyGet = (req,res) => {
    let productId = req.params.id;

    Product.findById(productId).then((productToBuy) => {
        res.render('products/buy', {product: productToBuy});
    });
}

function removePicture(picPath) {
    //delete file from temp folder
    fs.unlink('.' + picPath, function (err) {

        if(err){
            console.log('Picture is not removed');
            return;
        }
    });//#end - unlink
}