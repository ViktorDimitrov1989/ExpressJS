/*jshint esversion: 6 */
const formidable = require('formidable');
const fs = require('fs');
let Image = require('./../models/ImageSchema');
let Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    //deleteImg(req, res);
  } else {
    return true;
  }
}

function addImage(req, res) {

  let form = new formidable.IncomingForm();

  form.on('error', (err) => {
    console.log(err);
    return;
  });

  form.parse(req, (err, fields, files) => {

    if (err) {
      console.warn(err.message);
      return;
    }
    console.log(fields);
    //let image = new Image()
    fields.tagsID = fields.tagsID.split(',');
    fields.tagsID.pop();

    Image.create(fields)
      .then((savedImage) => {
        console.log(savedImage);

        addImageToTags(fields.tagsID, savedImage._id);

        res.writeHead(302, {
          Location: '/'
        });

        res.end();

      })
      .catch(handleError);

  });

}

function addImageToTags(tags, imageId) {
  for (var tag of tags) {
    Tag.findById(tag, (err, tagToUpdate) => {

      if (err) {
        console.warn(err.message);
        return;
      }

      tagToUpdate.images.push(imageId);

      tagToUpdate.save()
        .then((newTag) => { console.log(newTag); })
        .catch(handleError);

    });
  }
}

function handleError(err) {
  if (err) {
    console.warn(err.message);
  }
}
