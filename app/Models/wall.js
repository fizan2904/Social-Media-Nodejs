import mongoose from 'mongoose';

mongoose.model('wall',
	mongoose.Schema({
		uid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
		},
		name : {
			type : String,
			required : true
		},
		wall_type : {
			type : String,
			enum : ['Private', 'Public', 'Shared', 'Group']
		},
		url : {
			type : String
		}
	}, {
		timestamps : true
	})
);