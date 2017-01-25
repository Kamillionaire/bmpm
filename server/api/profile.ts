import express = require('express');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {PType} from '../models/PTypes';
import Profile from '../models/Profile';
let router = express.Router();

//TODO
// 1. edit current user, user permissions
// 2. get user by ID

router.get('/profile/:username', (req, res, next) => {
  Profile.findOne({
    username:req.params.username
  }).then((profile)=>{
     return res.json(profile)

  }).catch ((e)=>{
    next({message:'could not find profile', error:e})
  })
});
export = router;
