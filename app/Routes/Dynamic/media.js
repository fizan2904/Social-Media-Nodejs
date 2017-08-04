'use strict';

import multer from 'multer';
import shortid from 'shortid';
import express from 'express';
import mongoose from 'mongoose';
import MediaController from './../../Controllers/Media';

const router = express.Router();
const Media = mongoose.model('media');

let upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			let mime = file.originalname.split(".");
			cb(null, __dirname + '/../../../USERS/'+ req.session.passport.user._id +'/Media');
		},
		filename: function (req, file, cb) {
			let mime = file.originalname.split(".");
			console.log(mime);
		    cb(null, shortid.generate() + '-' + Date.now() + '.' + mime[mime.length-1])
		}
	}) 
});

router
	.post('/add',
		(req, res, next) => {
			if(req.isAuthenticated()){
				return next();
			}else{
				res.send('Login to continue'); 
			}
		},
		upload.any(),
		(req, res) => {
			let tasks = [];

			req.files.forEach(file => {
				file.uid = req.session.passport.user._id;
				file = new Media(file);
				tasks.push(file.save());
			});

			Promise.all(tasks)
				.catch(err => { res.send('Error'); })
				.then(() => { res.send('success'); });
		}
	);

export default router;