'use strict';

import express from 'express';
import mongoose from 'mongoose';
import UserController from './User';

const Wall = mongoose.model('wall');
const User = mongoose.model('user');

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
								Wall.updateById(this.req.params.wid, {$set : {this.req.body}}, (err, d) => {
									if(err) { reject(err); }
									resolve();
								});
							}else{
								reject('No wall with that id');
							}
						});
				});
		});
	}

	findWallWithAuth(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
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

	searchWallWithAuth(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
					Wall.find({ "name" : { $regex: /this.req.body.search/, $options: 'i'}})
						.catch(err => { reject(err); })
						.then(data => {
							resolve(data);
						});
				});
		});
	}

	findWallWithoutAuth(){
		return new Promise((resolve, reject) => {
			this.isNotLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
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
				});
		});
	}

	searchWallWithoutAuth(){
		return new Promise((resolve, reject) => {
			this.isNotLoggedIn()
				.catch(err => { reject(err); })
				.then(() => {
					Wall.find({$and: [{"name" : {$regex : /this.req.body.name/, $options : 'i'}}, { "wall_type": "Public"}]})
						.catch(err => { reject(err); })
						.then(data => {
							res.send(data);
						});
				});
		});
	}

	searchOwnWalls(){
		return new Promise((resolve, reject) => {
			this.isLoggedIn()
				.catch(err => {reject(err);})
				.then(() => {
					Wall.find({$and : [{"name": {$regex: /this.req.body.name/, $options: 'i'}}, {"uid" : this.req.session.passport.user._id}]})
						.catch(err => { reject(err); })
						.then(data => {
							res.send(data);
						});
				});
		});
	}
}