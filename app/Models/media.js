import mongoose from 'mongoose';

mongoose.model('media',
	mongoose.Schema({
		uid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
		},
		media_type : {
			type : String,
			enum : ['Video', 'Audio', 'Image', 'Document', 'Others']
		},
		media_size : Number,
		location : String,
		mime_type : String,
		md5_hash : String
	}, {
		timestamps : true
	})
);