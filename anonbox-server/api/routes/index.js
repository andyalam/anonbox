const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });

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
router.post('/box', auth, catchErrors(boxController.createBox));
router.delete('/box/:boxType', catchErrors(boxController.deleteBox));

// Image handling
router.post('/profile/:username/profile-image', auth, catchErrors(userController.postImage));
router.delete('/profile/:username/profile-image', catchErrors(userController.deleteImage));

module.exports = router;
