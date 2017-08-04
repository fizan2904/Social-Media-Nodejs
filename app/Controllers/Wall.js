'use strict';

import mixin from 'mixin';
import multer from 'multer';
import express from 'express';
import mongoose from 'mongoose';
import UserController from './User';

const Wall = mongoose.model('wall');
const User = mongoose.model('user');
const Post = mongoose.model('posts');
const Media = mongoose.model('media');

class wall extends User{
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
								let b = this.req.body;
								Wall.updateById(this.req.params.wid, {$set : {b}}, {"new" : true}, (err, d) => {
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
}

export default wall;