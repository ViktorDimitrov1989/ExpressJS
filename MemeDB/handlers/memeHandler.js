/*jshint esversion: 6 */
const db = require('./../config/dataBase.js');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');
const multiparty = require('multiparty');
const shortid = require('shortid');
const querystring = require('querystring');
const http = require('http');
const util = require('util');
const viewAllHtmlPath = './views/viewAll.html';
const addMemeViewPath = './views/addMeme.html';
const viewMemeDetailsPath = './views/details.html';
const saveImageFilePath = './public/memeStorage/0/';

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res);
  } else {
    return true;
  }
}

let viewAll = (request, response) => {

  let path = request.pathname;

  fs.readFile(viewAllHtmlPath, 'utf8', (err, data) => {

    if (err) {
      console.log(err);
      return;
    }

    let memes = db.getDb();

    let htmlToReplace = getAllMemesAsString(memes);

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', htmlToReplace);

    response.writeHead(200, {
      'content-type': 'text/html'
    });

    response.write(data);
    response.end();
  });

}

let viewAddMeme = (request, response) => {
  let path = request.pathname;

  fs.readFile(addMemeViewPath, 'utf8', (err, data) => {

    if (err) {
      console.log(err);
      return;
    }

    defaultResponse(response, data);
  });
}

let addMeme = (req, res) => {
  let picName = shortid.generate();
  let memeId = shortid.generate();

  let form = new formidable.IncomingForm();
  
  let dbLenght = Math.ceil(db.getDb().length / 10);
  let memePath = `./public/memeStorage/${dbLenght}/${picName}.jpg`;
  form.on('error', (error) => {
    console.log(error);
    return;
  }).on('fileBegin', (name, file) => {
  
    fs.access(`./public/memeStorage/${dbLenght}`, (err) =>{
      if(err){
        fs.mkdirSync(`./public/memeStorage/${dbLenght}`);
      }
    });
    
    file.path = memePath;
  });
 
  form.parse(req, function(err, fields, files){
    let id = shortid.generate();
    let createdmeme = memeGenerator(id, fields.memeTitle, memePath, fields.memeDescription, fields.status);
    db.add(createdmeme);
    db.save().then(() => {
      res.writeHead(302, {
        Location: '/'
      });

      res.end();
    });
  });

};

let getDetails = (request, response) => {
  let memeID = qs.parse(url.parse(request.url).query).id;
  let meme = db.getDb().find((x) => { return x.id === memeID });

  fs.readFile(viewMemeDetailsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
      `<div class="content">
    <img src="${meme.memeSrc}" alt=""/>
    <h3>Title  ${meme.title}</h3>
    <p> ${meme.description}</p>
    <button><a href="${meme.posterSrc}">Download Meme</a></button>
    </div>`);

    defaultResponse(response, data);

  });

}

//utils
let memeGenerator = (id, title, memeSrc, description, privacy) => {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  }
}

let defaultResponse = (response, data) => {
  response.writeHead(200, {
    'content-type': 'text/html'
  });

  response.write(data);
  response.end();
}

function getAllMemesAsString(data) {

  data = data.sort((a, b) => {
    return b.dateStamp - a.dateStamp;
  }).filter((x) => {
    return x.privacy === 'on';
  });

  let html = '';

  for (let meme of data) {
    html +=
      `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
    </div>`;
  }

  return html;
}