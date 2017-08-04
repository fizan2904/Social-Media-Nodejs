'use strict';

import multer from 'multer';
import shortid from 'shortid';
import express from 'express';
import mongoose from 'mongoose';
import PostController from './../../Controllers/Post';

const router = express.Router();
const Post = mongoose.model('post');

let upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			let mime = file.originalname.split(".");
			cb(null, __dirname + '/../../../USERS/'+ req.session.passport.user._id +'/Media');
		},
		filename: function (req, file, cb) {
			let mime = file.originalname.split(".");
		    cb(null, shortid.generate() + '-' + Date.now() + '.' + mime[mime.length-1])
		}
	})
});

router
	.get('/all', (req, res) => {
		let p = PostController(req);

		p.findAllPosts()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	})

	.get('/find/:pid', (req, res) => {
		let p = PostController(req);

		p.findPost()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	})

	.get('/remove/:pid', (req, res) => {
		let p = PostController(req);

		p.removePost()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	})

	.post('/add',
		upload.any(),
		(req, res, next) => {
			let tasks = [];

			req.files.forEach(file => {
				file.uid = req.session.passport.user._id;
				file = new Media(file);
				tasks.push(file.save());
			});

			Promise.all(tasks)
				.catch(err => { res.send('Error'); })
				.then(() => { return next(); });
		},
		(req, res) => {
			let p = PostController(req);

			p.addPost()
				.catch(err => { res.send(err); })
				.then(data => { res.send(data); });
		}
	);

export default router;