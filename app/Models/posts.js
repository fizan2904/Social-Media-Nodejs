import mongoose from 'mongoose';

mongoose.model('posts',
	mongoose.Schema({
		uid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
		},
		wid : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'wall'
		},
		title : {
			type : String,
			required : true
		},
		body : {
			type : String
		},
		media_links : [{
			mid : {
				type : mongoose.Schema.Types.ObjectId,
				ref : 'media'
			},
			viewed_from_here : [{
				type : mongoose.Schema.Types.ObjectId,
				ref : 'user'
			}],
			liked_from_here : [{
				type : mongoose.Schema.Types.ObjectId,
				ref : 'user'
			}],
			comments : [{
				user : {
					type : mongoose.Schema.Types.ObjectId,
					ref : 'user'
				},
				comment : {
					type : String
				},
				liked : [{
					type : mongoose.Schema.Types.ObjectId,
					ref : 'user'
				}],
				replied : [{
					name: {
						type : mongoose.Schema.Types.ObjectId,
						ref : 'user'
					},
					reply : String,
					liked : [{
						type : mongoose.Schema.Types.ObjectId,
						ref : 'user'
					}]
				}]
			}]
		}],
		position : {
			x : Number,
			y : Number,
			z : Number
		}
	}, {
		timestamps : true
	})
);