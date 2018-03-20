const mongoose = require('mongoose');
const { Schema } = mongoose;

const baseOptions = {
  discriminatorKey: 'itemtype',
  collection: 'items'
};

const baseSchema = new mongoose.Schema({}, baseOptions);

baseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

baseSchema.set('toJSON', {
  virtuals: true
});

// Our Base schema: these properties will be shared with our "real" schemas
const Base = mongoose.model('Base', baseSchema);

module.exports = mongoose.model('Base');
