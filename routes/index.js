var express = require('express');
var router = express.Router();
const fs = require('fs');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const multer = require('multer');
const path = require('path')
var bodyParser = require('body-parser');
var passport = require('passport');
require('../config/passport')(passport);

//import getToken supaya mendapatkan token auth-ed user
const getToken = require('./getToken');

// Load model
const Gallery = require("../models/gallery");
const { json } = require('body-parser');
const User = require('../models/user');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
})


/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  // console.log(token);
  if (token) {
    Gallery.getImages((err, images) => {
      if (err) {
        throw err
      }
      res.json(images)
    })
  } else {
    console.log('Unauthorized');
    return res.status(403).send({ message: 'Unauthorized' })
  }
});

router.post('/addimage', passport.authenticate('jwt', { session: false }), upload.any(), (req, res, next) => {
  const token = getToken(req.headers);
  if (token) {
    const newGallery = new Gallery({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      author: req.body.author,
      file: req.files[0].path
    })
    console.log('ggw');
    Gallery.addImages(newGallery, (err) => {
      if (err) {
        throw err;
      }
      res.send('ggwp')
    })

  } else {
    return res.status(401).send({ message: 'belum login' })
  }
})

router.get('/search/:keywords', (req, res) => {
  const key = req.params.keywords;
  Gallery.getImageByKeywords({ "name": key }, (err, images) => {
    if (err) {
      throw err;
    }

    res.json(images)
  })
})

router.post('/deleteImage/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  const id = req.params.id
  if (token) {
    Gallery.deleteImage(id, (err) => {
      if (err) {
        throw err;
      }
      res.status(200).json("Deleted")
    })
  } else {
    console.log('Unauthorized');
    return res.status(403).send({ message: 'Unauthorized' })
  }
})

router.post('/likes/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  const id = req.params.id;
  const userId = req.body.user
  if (token) {
    Gallery.findByIdAndUpdate(id, { $inc: { likes: 1 } }, err => {
      if (err) throw err;
      else {
        User.findByIdAndUpdate(userId, { $push: { likedPost: id } }, { strict: false }, (err) => {
          if (err) throw err;
          else {
            Gallery.getImageById(id, (err, images) => {
              if (err) throw err;
              else {
                User.findById(userId, (err, user) => {
                  if (err) throw err;
                  res.json({ "newLike": images.likes, "updatedUser": user.likedPost })
                })
              }

            })
          }
        })

      }
    })
  } else {
    console.log('Unauthorized');
    return res.status(403).send({ message: 'Unauthorized' })
  }
})

router.post('/dislike/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  const id = req.params.id;
  const userId = req.body.user
  if (token) {
    Gallery.findByIdAndUpdate(id, { $inc: { likes: -1 } }, err => {
      if (err) throw err;
      else {
        User.findByIdAndUpdate(userId, { $pull: { likedPost: id } }, { strict: false }, (err) => {
          if (err) throw err;
          else {
            Gallery.getImageById(id, (err, images) => {
              if (err) throw err;
              else {
                User.findById(userId, (err, user) => {
                  if (err) throw err;
                  res.json({ "newLike": images.likes, "updatedUser": user.likedPost })
                })
              }

            })
          }
        })

      }
    })
  } else {
    console.log('Unauthorized');
    return res.status(403).send({ message: 'Unauthorized' })
  }
})



module.exports = router;
