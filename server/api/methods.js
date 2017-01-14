"use strict";
var express = require("express");
var router = express.Router();
//Express has Express.Request but the interface isn't very good...  requires overrides
function setSession(req, res, next, user) {
    var token = user.generateJWT();
    return req.logIn(user, function (err) {
        console.log(err);
        if (err)
            res.status(500).json({ message: 'login failed' });
        return req.session.save(function (err) {
            if (err)
                res.sendStatus(500).json({ message: 'session failed' });
            return res.redirect('/profile');
        });
    });
}
function destroySession(req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            return res.status(500).json({ message: 'still authenticated, please try again.' });
        req.user = null;
        req.logout();
        return res.json({ isAuthenticated: req.isAuthenticated() });
    });
}
var methods = {
    setSession: setSession,
    destroySession: destroySession
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = methods;
