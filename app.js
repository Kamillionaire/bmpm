"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var Users_1 = require("./models/Users");
var index_1 = require("./routes/index");
var app = express();
var dev = app.get('env') === 'development' ? true : false;
if (dev) {
    var dotenv = require('dotenv');
    dotenv.load();
}
require("./config/passport");
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', function () {
    console.log('mongoose connected');
    if (dev) {
        mongoose.connection.db.dropDatabase();
        require('./models/seeds/index');
    }
    Users_1.default.findOne({ username: 'admin' }, function (err, user) {
        if (err)
            return;
        if (user)
            return;
        if (!user)
            var admin = new Users_1.default();
        admin.email = process.env.ADMIN_EMAIL;
        admin.username = process.env.ADMIN_USERNAME;
        admin.setPassword(process.env.ADMIN_PASSWORD);
        admin.roles = ['user', 'admin'];
        admin.save();
    });
});
mongoose.connection.on('error', function (e) {
    throw new Error(e);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/', index_1.default);
app.use('/api', require('./api/boxers'));
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
