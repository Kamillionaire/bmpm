import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';

let router = express.Router();

//Express has Express.Request but the interface isn't very good...  requires overrides
function setSession(req, res, next, user) {
  let token = user.generateJWT();

  return req.logIn(user, (err) => { console.log (err)
    if (err) res.status(500).json({message: 'login failed'});
    return req.session.save(function (err){
      if (err) res.sendStatus(500).json({message: 'session failed'});
      return res.redirect('/profile');
    });
  });
}

function destroySession(req, res, next) {

  req.session.destroy((err) => {
    if (err) return res.status(500).json({message: 'still authenticated, please try again.'});
    req.user = null;
    req.logout();
    return res.json({isAuthenticated: req.isAuthenticated()});
  });
}

function isAdmin(req, res, next) {
  if(!req.user){
    res.status(401).json({message: 'unauthorized'});
  }
  return req.user['roles'].some((v) => v === 'admin') ? next() : res.status(401).json({});
}

function deleteProfile(req, res, next) {
  if(!req.user){
    res.status(401).json({message: 'unauthorized'});
  }
  return req.user['roles'].some((v) => v === 'admin') ? next() : res.status(401).json({});
}

const methods = {
  setSession: setSession,
  destroySession: destroySession,
  isAdmin: isAdmin,
  deleteProfile: deleteProfile
}

export default methods;
