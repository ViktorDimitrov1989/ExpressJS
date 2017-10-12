/*jshint esversion: 6 */
const mongodb = require('mongodb');
const mongoose = require('mongoose');
let Image = require('./../models/ImageSchema');

module.exports = (req, res) => {

    console.log('KUR');
    

    if(req.pathname === '/delete'){
        

        deletePicture(req,res);
    }else{
        return true;
    }

    


}


function deletePicture(req, res){
    console.log('delete logic comes here');
}

