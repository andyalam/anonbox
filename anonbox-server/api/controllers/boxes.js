const mongoose = require('mongoose');

const Box = mongoose.model('Box');
const User = mongoose.model('User');
const { sendJsonResponse } = require('../handlers/handlers');


module.exports.getProfile = async (req, res) => {
	console.log(req.params);
	const { username } = req.params;
	const box = await Box.findOne({ username });
	const user = await User.findOne({ username });
	sendJsonResponse(res, 200, { box, user });
};
