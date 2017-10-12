/*jshint esversion: 6 */
const fs = require('fs');
const cuerystring = require('querystring');
const resultPath = './views/results.html';
const http = require('http');
const url = require('url');
let Image = require('./../models/ImageSchema');
let Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  let searchCriterias = url.parse(req.url, true).query;

  searchCriterias = getSearchCriterias(searchCriterias);

  if (req.pathname === '/search' && !isThereCriterias(searchCriterias)) {
    defaultSearch(req, res);
  } else if (req.pathname === '/search' && isThereCriterias(searchCriterias)) {
    searchByCriterias(req, res, searchCriterias);
  } else {
    return true;
  }
}


function searchByCriterias(req, res, criteriasObj) {

  Image
    .find({})
    .then(function (err, imageData) {

      if (err) {
        console.warn(err.message);
        return;
      }

      let tagsNames = criteriasObj.tagName.split(',');
      console.log(tagsNames);

      Tag.find({ tagName: { $in: tagsNames } })
        .then(function (err, tags) {

          if (err) {
            console.warn(err.message);
            return;
          }

          for (var i of imageData) {

            let tagIds = tags.map(t => t._id);

            Image.find({ tagsID: { $in: tagIds } })
              .then(function (err, filteredImages) {

                fs.readFile(resultPath, (err, data) => {

                  if (err) {
                    console.warn(err);
                    return;
                  }

                  let displayImages = '';

                  for (let image of filteredImages) {
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

                })

              })
          }

        })

    })
    .catch(handleError);

}

function isThereCriterias(searchCriterias) {
  let res = false;

  for (let key in searchCriterias) {
    if (searchCriterias[key] !== '') {
      res = true;
    }
  }

  return res;
}

function getSearchCriterias(searchCriterias) {
  let res = {};

  for (let searchCritKey in searchCriterias) {
    let searchCritValue = searchCriterias[searchCritKey];
    if (searchCritValue === 'Write tags separted by ,') {
      res[searchCritKey] = '';
    } else {
      res[searchCritKey] = searchCritValue;
    }
  }

  return res;
}

function handleError(err) {
  if (err) {
    console.warn(err.message);
  }
}

function defaultSearch(req, res) {

  fs.readFile(resultPath, (err, data) => {

    if (err) {
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


