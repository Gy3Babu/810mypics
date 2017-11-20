var Mongoose = require('mongoose');
var Schema = Mongoose.Schema; 

var PicSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, required:true },
    file:{fileName: String, originalName: String}
});

module.exports = Mongoose.model('pics', PicSchema);