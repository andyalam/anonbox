const { sendJsonResponse } = require('../handlers/handlers');
const { BOX_OPTIONS } = require('../models/boxes');
const mongoose = require('mongoose');
const Box = mongoose.model('Box');
const User = mongoose.model('User');


module.exports.getProfile = async (req, res) => {
	console.log(req.params);
	const { username } = req.params;
	let boxes = await Box.find({ username });
	boxes.forEach(box => {
		box.sortMessages()
	});

	const user = await User.findOne({ username });
	sendJsonResponse(res, 200, { boxes, user });
};

module.exports.postMessage = async (req, res) => {
	const { username } = req.params;
	let { message, boxType } = req.body;

	// If boxType hasn't been passed, assume general box
	if (!boxType) {
		boxType = BOX_OPTIONS['general'];
	}

	if (!username || !message) {
		sendJsonResponse(res, 400, {
			error: 'Invalid or missing "username"/"message" params'
		});
	}

	if (message.length < 10) {
		sendJsonResponse(res, 400, {
			error: 'Your message should contains a minimum of 10 characters!'
		});
	}

	const box = await Box.findOne({ username, boxType });

	box.messages.push({
		text: message
	});

	await box.save();

	// TODO:
	console.log(username, message, box);
	sendJsonResponse(res, 200, {});
};

module.exports.createBox = async(req, res) => {
	const { username, boxType, description } = req.body;
	const user = await User.findOne({ username });

	console.log(username, boxType, description);

	const box = new Box({
		username,
		boxType,
		description
	});
	await box.save();

	sendJsonResponse(res, 200, { box });
};

module.exports.deleteBox = async(req, res) => {
	const { boxType } = req.params;

	const box = await Box.findOne({ boxType });
	await box.remove();

	sendJsonResponse(res, 200, { box });
};
