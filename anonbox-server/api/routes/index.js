const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
// pass auth to any routes that require the user to be authenticated.
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
const authController = require('../controllers/authController');
const boxController = require('../controllers/boxController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/handlers');

// Authentication
router.post('/register', catchErrors(authController.register));
router.post('/login', authController.login);

// Boxes & Profile pages
router.get('/profile/:username', catchErrors(boxController.getProfile));
router.post('/profile/:username', catchErrors(boxController.postMessage));
router.post('/box', catchErrors(boxController.createBox));
router.delete('/box/:boxType', catchErrors(boxController.deleteBox));

// Image handling
router.post('/profile/:username/profile-image', catchErrors(userController.postImage));
router.delete('/profile/:username/profile-image', catchErrors(userController.deleteImage));

module.exports = router;
