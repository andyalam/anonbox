const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const { sendJsonResponse } = require('../handlers/handlers');

module.exports.register = async (req, res) => {
  if(!req.body.username || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required."
    });
    return;
  }

  const user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  await user.save();

  const token = user.generateJwt();
  const data = {
    token,
    user: {
      username: user.username,
      email: user.email
    }
  };

  sendJsonResponse(res, 200, data);
};


module.exports.login = (req, res) => {
  if(!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required."
    });
    return;
  }

  passport.authenticate('local', function(err, user, info) {
    let token;

    console.log(info);

    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      const data = {
        token,
        user: {
          username: user.username,
          email: user.email
        }
      };
      sendJsonResponse(res, 200, data);
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
};
