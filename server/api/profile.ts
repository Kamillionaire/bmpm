import express = require('express');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {PType} from '../models/PTypes';
import Profile from '../models/Profile';
let router = express.Router();

router.get('/profile/:username', (req, res, next) => {
  Profile.findOne({
    username:req.params.username
  }).populate('pType').then((profile)=>{
     return res.json(profile)
  }).catch ((e)=>{
    next({message:'could not find profile', error:e})
  })
});
export = router;
