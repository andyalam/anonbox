const { sendJsonResponse } = require('../handlers/handlers');
const { BOX_OPTIONS } = require('./boxes');
const mongoose = require('mongoose');
const Box = mongoose.model('Box');
const User = mongoose.model('User');


module.exports.getProfile = async (req, res) => {
	console.log(req.params);
	const { username } = req.params;
	const box = await Box.findOne({ username });
	const user = await User.findOne({ username });
	sendJsonResponse(res, 200, { box, user });
};

module.exports.postMessage = async (req, res) => {
	const { username } = req.params;
	const { message } = req.body;

	if (!username || !message) {
		sendJsonResponse(res, 400, {
			error: 'Invalid or missing "username"/"message" params'
		});
	}

	const box = await Box.findOne({
		username
	});
	console.log(username, message, box);

	sendJsonResponse(res, 200, {});
};
