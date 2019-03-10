const telegram = require('./Contoller/Other/TelegramBot');
process.on('uncaughtException', async function (err) {
    // console.log('Caught exception: ' + err.stack);
    await telegram.sendErrMessage(err);
    throw err;
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoUtil = require('./Contoller/DB/mongoUtil');
var fileUploaderRouter = require('./routes/fileUploaderRouter');
var fileDownloaderRouter = require('./routes/fileDownloaderRouter');
// var usersRouter = require('./routes/users');

var db = require('./Contoller/DB/db');


var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    res.io = io;
    next();
});

app.use('/fileUploader', fileUploaderRouter);
app.use('/fileDownloader', fileDownloaderRouter);

// app.use('/users', usersRouter);
// app.use('/users', mainRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var admin = require("firebase-admin");

var serviceAccount = require('./imamessanger-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://imamessanger.firebaseio.com"
});

mongoUtil.connectToServer(function (err) {
    var main = require('./Contoller/main');
    main.listen(io);
});


module.exports = {app: app, server: server};
