'use strict';

import express from 'express';
import mongoose from 'mongoose';
import WallController from './../../Controllers/Wall';

const router = express.Router();

router

	.post('/addWall', (req, res) => {
		let control = new WallController(req);

		control.addWall()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	})

	.post('/updateWall/:wid', (req, res) => {
		let control = new WallController(req);

		control.updateWall()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	})

	.get('/delete/:wid', (req, res) => {
		let control = new WallController(req);

		control.removeWall()
			.catch(err => { res.send(err); })
			.then(() => { res.status(200).send('Success'); });
	})

	.get('/find/:wid', (req, res) => {
		let control = new WallController(req);

		control.findWall()
			.catch(err => { res.send(err); })
			.then(data => { res.send(data); });
	});

export default router;