"use strict";
const express = require("express");
const passport = require("passport");
let router = express.Router();
router.get('/', (req, res, next) => {
    res.render('index');
});
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: true, failureRedirect: '/', successRedirect: '/' }));
module.exports = router;
