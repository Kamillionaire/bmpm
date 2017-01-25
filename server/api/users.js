"use strict";
const express = require("express");
const passport = require("passport");
const Users_1 = require("../models/Users");
const Profile_1 = require("../models/Profile");
let router = express.Router();
router.get('/users/:id', function (req, res, next) {
    Users_1.default.findOne(req.params._id).select('-passwordHash -salt').then((user) => {
        return res.status(200).json(user);
    }).catch((err) => {
        return res.status(401).json({ err: 'User not found.' });
    });
});
router.get('/currentuser', (req, res, next) => {
    return res.json(req.user);
});
router.post('/Register', function (req, res, next) {
    console.log('try harder');
    let user = new Users_1.default();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err)
            return next(err);
        let userProfile = new Profile_1.default();
        userProfile.dob = req.body.dob;
        userProfile.email = req.body.email;
        userProfile.state = req.body.state;
        userProfile.pType = req.body.pType;
        userProfile.save((err, profile) => {
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
        req.logIn(user, (err) => {
            if (err)
                return res.status(500).json({ message: 'login failed' });
            req.session.save(function (err) {
                if (err)
                    return res.status(500).json({ message: 'session failed' });
                return res.json({ message: 'session successful' });
            });
        });
    })(req, res, next);
});
router.get('/logout/local', (req, res, next) => {
    req.session.destroy((err) => {
        if (err)
            return res.status(500).json({ message: 'still authenticated, please try again.' });
        req.user = null;
        req.logout();
        return res.json({ isAuthenticated: req.isAuthenticated() });
    });
});
module.exports = router;
