"use strict";
var express = require("express");
var passport = require("passport");
var Users_1 = require("../models/Users");
var router = express.Router();
router.get('/users/:id', function (req, res, next) {
    Users_1.default.findOne(req.params._id).select('-passwordHash -salt').then(function (user) {
        return res.status(200).json(user);
    }).catch(function (err) {
        return res.status(401).json({ err: 'User not found.' });
    });
});
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
    user.pType = req.body.pType;
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err)
            return next(err);
        res.status(200).json({ message: "Registration complete." });
    });
});
router.post('/login/local', function (req, res, next) {
    console.log('api on');
    console.log(req.body);
    if (!req.body.username && !req.body.password) {
        return res.status(400).json({ message: "Please fill out every field" });
    }
    passport.authenticate('local', { session: true }, function (err, user, info) {
        console.log('authentication pass');
        console.log(err);
        if (err)
            return next(err);
        console.log(user);
        req.logIn(user, function (err) {
            console.log(err);
            if (err)
                res.status(500).json({ message: 'login failed' });
            console.log(req.session);
            return req.session.save(function (err) {
                if (err)
                    res.status(500).json({ message: 'session failed' });
                return res.json({ message: 'session successful' });
            });
        });
    })(req, res, next);
});
router.get('/logout/local', function (req, res, next) {
    req.logout();
    return res.json({
        isauthenticated: req.isAuthenticated()
    });
});
module.exports = router;
