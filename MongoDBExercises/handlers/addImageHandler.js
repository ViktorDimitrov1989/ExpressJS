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
      .then((imageToSave) => {
        //hard way
        //addImageToTags(fields.tagsID, savedImage._id);

        let targetedTags = imageToSave.tagsID;
        Tag.update(
          {_id:{$in: targetedTags}},
          {$push: {images: imageToSave._id}}, 
          {multi: true})
        .then((resolve) => {
          //console.log(resolve);

        })
        .catch(handleError);

      })
      .catch(handleError);

      res.writeHead(302, {
        Location: '/'
      });

      res.end();

  });

}

//hard way
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

