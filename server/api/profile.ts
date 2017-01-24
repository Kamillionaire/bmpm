// import express = require('express');
// import * as mongoose from 'mongoose';
// import * as passport from 'passport';
// import * as jwt from 'jsonwebtoken';
// import Users from '../models/Users';
// import {PType} from '../models/PTypes';
//
// let router = express.Router();
//
// router.put('/users/:id', function(req, res, next) {
//     Users.findOne(req.params._id).select('-passwordHash -salt').then((user) => {
//         return res.status(200).json(user);
//     }).catch((err) => {
//         return res.status(401).json({ err: 'User not found.' })
//     });
// });
