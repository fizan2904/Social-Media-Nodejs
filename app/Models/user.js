import mongoose from 'mongoose';

let UserSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	}
}, {
	timestamps : true
});

mongoose.model('user', UserSchema);