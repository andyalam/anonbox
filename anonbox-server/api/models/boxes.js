const mongoose = require('mongoose');
const { Schema } = mongoose;

const Base = require('./base-schema');

exports.BOX_OPTIONS = {
	general: 'general'
};

const messageSchema = new Schema({
	text: {
		type: String,
		minlength: 10,
		maxlength: 300,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

const boxSchema = new Schema({
	username: { type: String, required: true },
	boxType: { type: String, required: true },
	description: { type: String, minlength: 1, maxlength: 300 },
	messages: [messageSchema]
});

boxSchema.methods.sortMessages = function() {
	if (!this.messages.length) { return; }

	this.messages = this.messages.sort((a, b) => {
		return a.created < b.created;
	});
};

const Box = Base.discriminator('Box', boxSchema);

mongoose.model('Box');
