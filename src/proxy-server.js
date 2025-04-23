

const { extend } = require("lodash")
var path = require('path');
var express = require('express');
var session = require('express-session');
const CORS = require("cors")
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');

var { router: authRouter, middleware: isAuthenticated } = require('./auth');

const createProxyMiddleware = require('./proxy');
const { proxy, EXPRESS_SESSION_SECRET } = require("../.config")

const proxyServer = express();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


proxyServer.use(session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set this to true on production
    }
}));


proxyServer.use(logger('dev'));

proxyServer.use(bodyParser.text());
proxyServer.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '100mb',
    extended: true
}));

proxyServer.use(bodyParser.json({
    limit: '100mb'
}));


proxyServer.use(cookieParser());
proxyServer.use(express.urlencoded({ extended: false }));
proxyServer.use(CORS())
    

proxyServer.use('/auth', authRouter);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

proxyServer.use(isAuthenticated, createProxyMiddleware(proxy));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // catch 404 and forward to error handler
// proxyServer.use(function(req, res, next) {
//     next(createError(404));
// });

// // error handler
// proxyServer.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


module.exports = proxyServer