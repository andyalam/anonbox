const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
// pass auth to any routes that require the user to be authenticated.
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
const ctrlAuth = require('../controllers/authentication');
const { catchErrors } = require('../handlers/handlers');

// Authentication
router.post('/register', catchErrors(ctrlAuth.register));
router.post('/login', ctrlAuth.login);


module.exports = router;
