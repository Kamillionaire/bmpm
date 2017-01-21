import express = require('express');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import PType from '../models/PTypes';
// import Methods from '../models/Methods';

let router = express.Router();

router.get('/users/:id', function(req, res, next) {
  Users.findOne(req.params._id).select('-passwordHash -salt').then((user) => {
    return res.status(200).json(user);
  }).catch((err) => {
    return res.status(401).json({err: 'User not found.'})
  });
});

//CONSTANTLY RETURNS 200 because we are always authorized to check.
router.get('/currentuser', (req, res, next) => {
  console.log(req.user)
  if (!req.user) return res.json({});
  return res.json(req.user);
});

router.post('/Register', function(req, res, next) {
  let user = new Users();
  user.username = req.body.username;
  user.email = req.body.email;
  user.state = req.body.state;
  user.pType = req.body.pType;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    res.status(200).json({message: "Registration complete."});
  });
});

router.post('/login/local', function(req, res, next) {
  console.log('api on')
  console.log(req.body)
  if(!req.body.username && !req.body.password){
    return res.status(400).json({message: "Please fill out every field"});
  }

  passport.authenticate('local', function(err, user, info) {
    console.log('authentication pass')
    console.log(err)
    if(err) return next(err);
    console.log(user)
    return req.logIn(user, (err) => { console.log (err)
      if (err) res.status(500).json({message: 'login failed'});
      return req.session.save(function (err){
        if (err) res.status(500).json({message: 'session failed'});
        return res.json({message:'session successful'});
      });
    });
  });
});

router.get('/logout/local',(req, res, next)=>{
  req.logout();
  return res.json({
    isauthenticated:req.isAuthenticated()
  })
});

export = router;
