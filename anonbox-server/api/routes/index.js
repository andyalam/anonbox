const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
// pass auth to any routes that require auth.
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

const ctrlAuth = require('../controllers/authentication');

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
