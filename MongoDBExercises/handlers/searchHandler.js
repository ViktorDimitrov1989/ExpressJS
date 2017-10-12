/*jshint esversion: 6 */
const fs = require('fs');
const cuerystring = require('querystring');
const resultPath = './views/results.html';
let Image = require('./../models/ImageSchema');


module.exports = (req, res) => {
  if (req.pathname === '/search') {
    defaultSearch(req, res);
  } else {
    return true;
  }
}


function defaultSearch(req, res) {
  
  fs.readFile(resultPath, (err, data) => {

    if(err){
      console.warn(err);
      return;
    }

    Image.find({})
    .then(images => {
      let displayImages = '';

      for (let image of images) {
        displayImages += `<fieldset id => <legend>${image.imageTitle}:</legend> 
        <img src="${image.imageUrl}">
        </img><p>${image.description}<p/>
        <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
        </button> 
        </fieldset>`;
      }
      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, displayImages);

      res.writeHead(200, {
        'content-type': 'text/html'
      });

      res.write(data);
      res.end();
    });
  });
}


