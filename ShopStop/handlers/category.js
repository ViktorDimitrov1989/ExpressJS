const mongoose = require('mongoose');

let Category = require('../models/Category.js');

module.exports.addGet = (req,res) => {
    res.render('category/add');
}

module.exports.addPost = (req, res) => {
    let category = req.body;

    Category
    .create(category)
    .then((createdCategory) => {
        res.redirect('/');
    });

    
}