'use strict';

import mongoose from 'mongoose';
import WallController from './Wall';

const Wall = mongoose.model('wall');
const Post = mongoose.model('post');

class post extends WallController{

	constructor(req){
		super(req);
		this.req = req;
	}

	addPost(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(_ => { reject('Login to continue'); })
				.then(_ => {
					let newPost = new Post(this.req.body);

					newPost.save()
						.catch(err => { reject(err); })
						.then(() => { resolve(newPost); });
				});
		});
	}

	findPost(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(_ => { reject('Login to continue'); })
				.then(_ => {
					Post.findById(this.req.params.pid)
						.catch(err => { reject(err); })
						.then((data) => { resolve(data); });
				});
		});
	}

	removePost(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(_ => { reject('Login to continue'); })
				.then(_ => {
					Post.removeById(this.req.params.pid)
						.catch(err => { reject(err); })
						.then(() => { resolve(); });
				});
		});
	}

	findAllPosts(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(_ => { reject('Login to continue'); })
				.then(_ => {
					Post.find({ uid : this.req.session.passport.user._id })
						.catch(err => { reject(err); })
						.then(data => { resolve(data); });
				});
		});
	}

}

export default post;