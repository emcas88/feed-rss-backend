var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Feed', FeedSchema);
