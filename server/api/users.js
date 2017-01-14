"use strict";
var express = require("express");
var passport = require("passport");
var Users_1 = require("../models/Users");
var methods_1 = require("./methods");
var router = express.Router();
router.get('/users/:id', function (req, res, next) {
    Users_1.default.findOne(req.params._id).select('-passwordHash -salt').then(function (user) {
        return res.status(200).json(user);
    }).catch(function (err) {
        return res.status(401).json({ err: 'User not found.' });
    });
});
//CONSTANTLY RETURNS 200 because we are always authorized to check.
router.get('/currentuser', function (req, res, next) {
    console.log(req.user);
    if (!req.user)
        return res.json({});
    return res.json(req.user);
});
router.post('/Register', function (req, res, next) {
    var user = new Users_1.default();
    user.username = req.body.username;
    user.email = req.body.email;
    user.state = req.body.state;
    user.personality = req.body.personality;
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err)
            return next(err);
        res.status(200).json({ message: "Registration complete." });
    });
});
router.post('/login/local', function (req, res, next) {
    if (!req.body.username && !req.body.password) {
        return res.status(400).json({ message: "Please fill out every field" });
    }
    passport.authenticate('local', function (err, user, info) {
        if (err)
            return next(err);
        if (user)
            return methods_1.default.setSession(req, res, next, user);
        return res.status(400).json(info);
    })(req, res, next);
});
router.get('/logout/local', function (req, res, next) {
    req.logout();
    return res.json({
        isauthenticated: req.isAuthenticated()
    });
});
module.exports = router;
