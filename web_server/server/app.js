var express = require('express');
var path = require('path');
var passport = require('passport');
var cors = require('cors');
var bodyParser = require('body-parser');


var auth = require('./routes/auth')
var index = require('./routes/index');
var news = require('./routes/news');
var config = require('./config/config.json')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static',
    express.static(path.join(__dirname, '../client/build/static')));

// TODO: remove this after development is done.
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

require('./models/main.js').connect(config.mongoDbUri);
// load passport strategies
app.use(passport.initialize());
var localSignUpStrategy = require('./passport/Signup_passport');
var localLoginStrategy = require('./passport/Login_passport');
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLoginStrategy);

const authChecker = require('./middleware/auth_checker');

app.use(cors());
app.use(bodyParser.json());


app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);
app.use('/news', authChecker);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
});

module.exports = app;
