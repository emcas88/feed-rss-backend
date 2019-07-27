var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
        url: String
    }, { 
        versionKey: false
    }
);

module.exports = mongoose.model('Feed', FeedSchema);
