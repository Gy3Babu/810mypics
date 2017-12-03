var Mongoose = require('mongoose');
var Schema = Mongoose.Schema; 

var PicSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, required:true },
    name:{type: String},
    files:[{filename: String, originalName: String, dateUploaded: Date}]
});

module.exports = Mongoose.model('pics', PicSchema);