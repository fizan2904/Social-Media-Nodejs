import mongoose from 'mongoose';

mongoose.model('media',
	mongoose.Schema({
		uid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
		},
		fieldname : String,
		originalname : String,
		encoding : String,
		mimetype : String,
		size : Number,
		destination : String,
		filename : String,
		path : String,
		buffer : String
	}, {
		timestamps : true
	})
);