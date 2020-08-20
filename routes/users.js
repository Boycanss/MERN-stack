const express = require("express");
const router = express.Router();
const getToken = require('./getToken');
const { secretOrKey } = require("../config/keys");
const jwt = require("jsonwebtoken");

//import controller 
const UserController = require('../controller/userController');


/* GET users listing. */
router.get('/getUser', function (req, res, next) {
  User.find((err, users) => {
    if (err) {
      return err
    } else {
      res.json(users)
    }
  })
});

//ROUTER REGISTER
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserController(name, email, password);
  newUser.register(req, res);
})

//LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const logUser = new UserController('', email, password);
  logUser.login(req, res);
})

//Verifikasi Untuk Mendapatkan Data pada React
router.get("/verify/token", (req, res) => {
  const token = getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: 'token belum di-post' })
  }
  //get user
  jwt.verify(token, secretOrKey, (err, user) => {
    if (err) {
      throw err;
    }
    User.findById({
      '_id': user.id
    }, (err, user) => {
      if (err) {
        throw err;
      }
      res.json({
        user: user,
        token: token
      })
    })
  })
})

module.exports = router;
