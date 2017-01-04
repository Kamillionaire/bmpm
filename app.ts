import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as mongoose from 'mongoose';

//express routes
import routes from './routes/index';

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

//db connections
// mongodb://user:password@sub.mlab.com:39482/myapp
// instead of process if you don't use dotenv package
mongoose.connect(process.env.MONGO_URI);

//optional
mongoose.connection.on('connected', () => {
  console.log('mongoose connected');

  //if dev seed the deb
  if(dev) {
    mongoose.connection.db.dropDatabase();
    require('./models/seeds/index');
  }
});

//optional
mongoose.connection.on('error', (e) => {
  throw new Error(e);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static routing
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));

//a server route
app.use('/', routes);

//apis
app.use('/api', require('./api/boxers'));

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
