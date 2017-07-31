'use strict';

import express from 'express';
import mongoose from 'mongoose';
import UserController from './User';

const Wall = mongoose.model('wall');
const User = mongoose.model('user');
const Post = mongoose.model('posts');
const Media = mongoose.model('media');

class wall implements User{
	constructor(req){
		super(req);
		this.req = req;
	}

	addWall(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
					let newWall = new Wall(this.req.body);
					newWall.uid = this.req.session.passport.user._id;
					newWall.save()
						.catch(err => { reject(err); })
						.then(() => {
							resolve(newWall);
						});
				});
		});
	}

	removeWall(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
					Wall.findById(this.req.params.wid)
						.catch(err => { reject(err); })
						.then(data => {
							if(data == null || data == undefined){
								reject("No wall with that id");
							}else{
								Wall.removeById(this.req.params.wid)
									.catch(err => { reject(err); })
									.then(() => { resolve(); });
							}
						})
				})
		});
	}

	updateWall(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => { reject(err); })	
				.then(() => {
					Wall.findById(this.req.parama.wid)
						.catch(err => { reject(err); })
						.then(data => {
							if(data != null || data != undefined){
								Wall.updateById(this.req.params.wid, {$set : {this.req.body}}, {"new" : true}, (err, d) => {
									if(err) { reject(err); }
									resolve(d);
								});
							}else{
								reject('No wall with that id');
							}
						});
				});
		});
	}

	findWall(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(_ => {
					Wall.findById(this.req.params.wid)
						.catch(err => {reject(err); })
						.then(data => {
							if(data != null || data != undefined){
								if(data.wall_type == "Public"){
									resolve(data);
								}else{
									reject('Can\'t be accessed');
								}
							}else{
								reject('No wall with that id');
							}
						});
				})
				.then(_ => {
					Wall.findById(this.req.params.wid)
						.catch(err => { reject(err); })
						.then(data => {
							if(data != null || data != undefined){
								resolve(data);
							}else{
								reject('No wall with that id');
							}
						});
				});
		});
	}

	addMedia(){
		return new Promise((resolve, reject) => {
			let newMedia = new Media
		});
	}
}

export default wall;