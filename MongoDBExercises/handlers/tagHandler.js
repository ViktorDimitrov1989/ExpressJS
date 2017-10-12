/*jshint esversion: 6 */
const formidable = require('formidable');
const fs = require('fs');
let Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    addTag(req, res);
  } else {
    return true;
  }
}

function addTag(req, res) {

  let form = new formidable.IncomingForm();

  form.on('error', (error) => {
    console.log(error);
    return;
  });

  form.parse(req, function (err, fields, files) {
    
    if(err){
      console.warn(err.message);
      return;
    }
    
    Tag.create(fields)
    .then((tag) => {
      console.log(tag);

      res.writeHead(302, {
        Location: '/'
      });
  
      res.end();

    })
    .catch(handleError);

    
  });
}


function handleError(err) {
  if (err) {
    console.warn(err.message);
  }
}