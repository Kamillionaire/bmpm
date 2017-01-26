"use strict";
const passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
const Users_1 = require("../models/Users");
passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    Users_1.default.findOne({ _id: obj['_id'] }, { passwordHash: 0, salt: 0 }, (err, user) => {
        if (err)
            done(null, {});
        done(null, user);
    });
});
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.ROOT_URL + "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos'],
}, function (accessToken, refreshToken, profile, done) {
    Users_1.default.findOne({ facebookId: profile.id }, function (err, user) {
        if (user) {
            return done(err, user);
        }
        else {
            let u = new Users_1.default();
            u.username = profile.displayName;
            u.facebookId = profile.id;
            u.facebook.name = profile.displayName;
            u.facebook.token = accessToken;
            u.save((err) => {
                if (err)
                    throw err;
                return done(null, u);
            });
        }
    });
}));
passport.use(new LocalStrategy(function (username, password, done) {
    let lc = username.toLowerCase();
    console.log(lc);
    Users_1.default.findOne({ username: lc }).select('+salt +passwordHash')
        .exec(function (err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        if (!user.validatePassword(password))
            return done(null, false, { message: 'Password does not match.' });
        return done(null, user);
    });
}));
