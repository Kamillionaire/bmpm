"use strict";
var express = require("express");
var passport = require("passport");
var Users_1 = require("../models/Users");
var Profile_1 = require("../models/Profile");
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
    return res.json(req.user);
});
router.post('/Register', function (req, res, next) {
    console.log('try harder');
    var user = new Users_1.default();
    var lc = req.body.username;
    user.username = lc.toLowerCase();
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err)
            return next(err);
        var userProfile = new Profile_1.default();
        userProfile.username = req.body.username;
        userProfile.dob = req.body.dob;
        userProfile.email = req.body.email;
        userProfile.state = req.body.state;
        userProfile.pType = req.body.pType;
        userProfile.save(function (err, profile) {
            if (err)
                return next(err);
            res.status(200).json({ message: "Registration complete." });
        });
    });
});
router.post('/login/local', function (req, res, next) {
    if (!req.body.username && !req.body.password) {
        return res.status(400).json({ message: "Please fill out every field" });
    }
    passport.authenticate('local', { session: true }, function (err, user, info) {
        if (err)
            return next(err);
        req.logIn(user, function (err) {
            if (err)
                return next({ message: 'login failed', Error: err });
            req.session.save(function (err) {
                if (err)
                    return res.status(500).json({ message: 'session failed' });
                return res.json(user);
            });
        });
    })(req, res, next);
});
router.get('/logout/local', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            return res.status(500).json({ message: 'still authenticated, please try again.' });
        req.user = null;
        req.logout();
        return res.json({ isAuthenticated: req.isAuthenticated() });
    });
});
router.delete('/users/:id', methods_1.default.isAdmin, function (req, res, next) {
    Users_1.default.remove({ _id: req.params.id }, function (err) {
        if (err)
            return next({ message: 'error deleting', error: err });
        return res.status(200).json({ message: 'Deleted' });
    });
});
router.get('/users', methods_1.default.isAdmin, function (req, res, next) {
    Users_1.default.find().then(function (users) {
        res.json(users);
    }).catch(function (err) {
        return next({ message: 'can not list users', error: err });
    });
});
module.exports = router;
