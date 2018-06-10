// required modules
const express = require('express');
const mongoose = require('mongoose');

// router function
const router = express.Router();

// load user model
require('../models/User');
const User = mongoose.model('usersCollection');

// login route
router.get('/login', function (req, res) {
  res.render('users/login');
})

// register route
router.get('/register', function (req, res) {
  res.render('users/register');
})

// add user process
router.post('/login', function (req, res) {

  let errors = [];
  if (req.body.password != req.body.cpassword) {
    errors.push('password must be the same');
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      usertype: req.body.usertype,
      username: req.body.username
    });
  } else {
    // checks if the username is already taken
    User.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          console.log('username is taken');
          res.redirect('/users/register')
        } else {
          const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            usertype: req.body.usertype,
            username: req.body.username,
            password: req.body.password
          });
          newUser.save()
            .then(user => {
              console.log('successful');
              res.redirect('/users/login')
            })
        }
      });

  }

})

// export router in the template
module.exports = router;