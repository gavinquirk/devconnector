const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        // Grab gravatar url from user email
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default -- placeholder picture
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        // Generate salt
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(error => console.log(error));
          })
        })
      }
    })
})

// @route   GET api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      //Check for user
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ msg: 'Success' })
          } else {
            return res.status(400).json({ password: 'Password is incorrect' })
          }
        })
    });
});

module.exports = router;