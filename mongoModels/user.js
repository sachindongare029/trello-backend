var mongoose = require('mongoose');


var user = new mongoose.Schema({
	email:String,
	name:String,
	password: String

},{strict:false});


module.exports = user;