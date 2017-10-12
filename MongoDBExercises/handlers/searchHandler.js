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
    if (searchCriterias.beforeDate !== '' || searchCriterias.afterDate !== '') {
      searchByTwoDates(req, res, searchCriterias.beforeDate, searchCriterias.afterDate);
    } else {
      searchByCriterias(req, res, searchCriterias);
    }

  } else {
    return true;
  }
}

function searchByTwoDates(req, res, startDate, endDate) {
  let endFormated = '2017-1-1';
  let startFormated = '2180-1-1';

  if(startDate !== ''){
    startFormated = new Date(startDate).toISOString();
  }
  
  if(endDate !== ''){
    endFormated = new Date(endDate).toISOString();
  }


  Image.find({
    'creationDate': {
      $gte: `${endFormated}`,
      $lt: `${startFormated}`
    }
  })
    .limit(10)
    .then((images) => {

      fs.readFile(resultPath, (err, data) => {

        if (err) {
          console.warn(data.message);
          return;
        }

        printImages(res, data, images);
      });

    })
    .catch(handleError);


}

function printImages(res, data, images) {
  let replaceStr = '';
  for (let image of images) {
    replaceStr += `<fieldset id => <legend>${image.imageTitle}:</legend> 
    <img src="${image.imageUrl}">
    </img><p>${image.description}<p/>
    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
    </button> 
    </fieldset>`;
  }
  data = data.toString().replace(`<div class='replaceMe'></div>`, replaceStr);
  
  res.writeHead(200,
    { 'content-type': 'text/html' });

  res.write(data);
  res.end();
}

function searchByCriterias(req, res, criteriasObj) {

  let selectedTags = criteriasObj.tagName.split(', ');

  Tag.find({ tagName: { $in: selectedTags } })
    .populate('images')
    .select('_id')
    .then(function (data) {
      let images = [];

      for (let tag of data) {
        for (let elem of tag.images) {
          images.push(elem);
        }
      }

      let uniqueArr = images.filter((elem, pos) => {
        return images.indexOf(elem) == pos;
      });

      images.sort((a, b) => { return b.creationDate - a.creationDate; });

      fs.readFile(resultPath, (err, data) => {

        if (err) {
          console.warn(err);
          return;
        }

        let replaceStr = ``;

        for (let image of images) {
          replaceStr += `<fieldset id => <legend>${image.imageTitle}:</legend> 
          <img src="${image.imageUrl}">
          </img><p>${image.description}<p/>
          <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
          </button> 
          </fieldset>`;
        }
        data = data.toString().replace(`<div class='replaceMe'></div>`, replaceStr);

        res.writeHead(200,
          { 'content-type': 'text/html' });

        res.write(data);
        res.end();

      });

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


