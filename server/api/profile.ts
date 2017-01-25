import express = require('express');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {PType} from '../models/PTypes';
import Profile from '../models/Profile';
let router = express.Router();

router.post('/profiles/:id', function(req, res, next) {
    Profile.create(req.params.id).then((profile) => {
        return res.status(200).json(profile);
    }).catch((err) => {
        return res.status(401).json({ err: 'User not found.' })
    });
});

router.post('/Profile', function(req, res, next) {

    let profile = new Profile();
    profile.username = req.body.username;
    profile.dob = req.body.dob;
    profile.state = req.body.state;
    profile.pType = req.body.pType;
    profile.save(function(err, user) {
        if (err) return next(err);
        res.status(200).json({ message: "Welcome to your Profile."});
    })
});

export default router;
