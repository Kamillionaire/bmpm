import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as session from 'express-session';
const MongoStore = require('connect-mongo')(session)
import Users from './models/Users';
import {PTypesSeeds} from './models/seeds/pTypes';
//express routes
import * as routes from './routes/index';

//init express and assign it to app var
//INITIATE THE APP
let app = express();

//optional for security
const dev = app.get('env') === 'development' ? true : false;

//optional
if(dev){
  let dotenv = require('dotenv');
  dotenv.load();
}
require("./config/passport");

//db connections
// mongodb://user:password@sub.mlab.com:39482/myapp
// instead of process if you don't use dotenv package
mongoose.connect(process.env.MONGO_URI);

//optional
mongoose.connection.on('connected', () => {
  console.log('mongoose connected');
  console.log(__dirname)
  //if dev seed the deb
  if(dev) {
    // (only drop data and seed if there are no data types)
    // mongoose.connection.db.dropDatabase();
    //   let s=new PTypesSeeds();
    //   s.createSeeds();
  }

  Users.findOne({username: 'admin'}, (err, user) => {
    if(err) return;
    if(user) return;
    if(!user)
      var admin = new Users();
      admin.email = process.env.ADMIN_EMAIL;
      admin.username = process.env.ADMIN_USERNAME;
      admin.state= 'state';
      admin.pType= 'pType';
      admin.setPassword(process.env.ADMIN_PASSWORD);
      admin.roles = ['user', 'admin'];
      admin.save((err,u)=>{
        if (err) console.log(err);
        console.log(u);
      });
  });
});

//optional
mongoose.connection.on('error', (e) => {
  throw new Error(e);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//config req.session your session
app.enable('trust proxy'); // trust first proxy

let sess = {
  maxAge: 172800000, // 2 days
  secure: false,
  httpOnly: true
}

//set to secure in production
if (app.get('env') === 'production') {
  sess.secure = true // serve secure cookies
}

//use session config
app.use(session({
  cookie: sess,
  secret: process.env.SESSION_SECRET, // can support an array
  store: new MongoStore({
    url: process.env.MONGO_URI
  }),
  unset: 'destroy',
  resave: false,
  saveUninitialized: false //if nothing has changed.. do not restore cookie
}));

//config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//static routing
app.use('/bower_components', express.static(path.join(__dirname,'../bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/client', express.static(path.join(__dirname,'../client')));

// bootstrap api
app.use('/api', require('./api/users'));
app.use('/api', require('./api/pTypes'));

//a server route
app.use('/', require('./routes/index'));


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: Error, req, res, next) => {

    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// TODO Error interface
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
