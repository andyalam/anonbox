const { sendJsonResponse } = require('../handlers/handlers');

module.exports.postImage = async(req, res) => {
  const { user } = req;
  const { image } = req.body;

  console.log(user);

  sendJsonResponse(res, 200, {
    user
  });
};

module.exports.deleteImage = async(req, res) => {};
