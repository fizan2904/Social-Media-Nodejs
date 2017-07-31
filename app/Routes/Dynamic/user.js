'use strict';

import express from 'express';
import passport from 'passport';
import UserController from '../../Controllers/User';
import passportConfig from '../../../config/passport';

const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

passport.use(new LocalStrategy(passportConfig.strategy));
passport.serializeUser(passportConfig.serialize);
passport.deserializeUser(passportConfig.deserialize);

router

	.post('/new', (req, res) => {
		let newUser = new UserController(req);

		newUser.signUp()
			.catch(err => { res.send(err); })
			.then((data) => {
				console.log(data);
				res.send(data);
			});
	})

	.post('/login', passport.authenticate(
		'local', {
			successRedirect : '/dashboard',
			failureRedirect : '/login',
			failureFlasr : true
		}
	))

	.post('/addDetails', (req, res) => {
		let newUser = new UserController(req);

		newUser.addDetails()
			.catch(err => { res.send('Error'); })
			.then(() => {
				res.status(200).send('success');
			});
	})

	.get('/logout', (req, res) => {
		req.logout();
		res.status(200).send('success');
	});

export default router;