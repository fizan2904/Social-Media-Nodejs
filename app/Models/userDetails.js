import mongoose from 'mongoose';

mongoose.model('user_details', 
	mongoose.Schema({
		uid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
		},
		firstname : {
			type : String
		},
		lastname : {
			type : String
		},
		geoId : {
			lat : {
				type : Number
			},
			lon : {
				type : Number
			}
		}
	}, {
		timestamps : true
	})
)