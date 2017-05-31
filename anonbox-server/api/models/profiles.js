const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	text: {
		type: String,
		minlength: 10,
		maxlength: 300,
		required: true 
	}
});

const profileSchema = new Schema({
	username: { type: String, required: true },
	description: { type: String, minlength: 1, maxlength: 300 },
	messages: [messageSchema]
});

mongoose.model('Profile', profileSchema);
