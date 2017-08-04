'use strict';

import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('user');
const Media = mongoose.model('media');
const UserDetails = mongoose.model('user_details');

class user{
	constructor(req){
		this.req = req;
	}

	isLoggedIn(){
		return new Promise((resolve, reject) => {
			if(this.req.isAuthenticated){
				resolve(true);
			}else{
				reject(false);
			}
		});
	}

	isNotLoggedIn(){
		return new Promise((resolve, reject) => {
			if(this.req.isAuthenticated){
				reject(false);
			}else{
				resolve(true);
			}
		});
	}

	signUp(){
		return new Promise((resolve, reject) => {
			if(this.req.body.username == undefined || this.req.body.password == undefined || this.req.body.password1 == undefined || this.req.body.password1 !== this.req.body.password){
				reject('All atribs are required');
			}else{
				let newUser = new User({
					username : this.req.body.username,
					password : this.req.body.password
				});

				User.findOne({username : newUser.username})
					.catch(err => { reject(err); })
					.then(data => {
						if(data != null){
							reject("Username already in use");
						}else{
							let salt = bcrypt.genSaltSync(11);
							newUser.password = bcrypt.hashSync(newUser.password, salt);
							newUser.save()
								.catch(err => { reject(err); })
								.then(() => { 
									resolve(newUser);
								});
						}
					});
			}
		});
	}

	addDetails(){
		return new Promise((resolve, reject) => {
			let newDetails = new UserDetails(this.req.body);
			newDetails.uid = this.req.session.passport.user._id;
			UserDetials.findOneAndUpdate({uid : this.req.session.passport.user._id}, this.req.body, {upsert:true}, function(err, doc){
			    if (err){ reject(err); }
			    resolve();
			});		
		});
	}
}

export default user;