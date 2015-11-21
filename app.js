

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

var port = process.env.PORT || 3000;

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);


/*app.use('/views/:name', function(req, res){
  res.render(req.params.name);
});

app.use('/*', function(req, res) {
  res.render('index', {
    title: 'test'
  });
});*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

var votes = {
  yes:0,
  no:0,
  idontknow:0
}
io.on('connection', function(socket) {
  socket.emit('updateVotes', votes);
  socket.on('yes', function() {
    votes.yes++;
    socket.emit('updateVotes', votes);
  });
  socket.on('no', function() {
    votes.no++;
    socket.emit('updateVotes', votes);
  });
  socket.on('idknow', function() {
    votes.idontknow++;
    socket.emit('updateVotes', votes);
  });
  socket.on('reset', function() {
    votes.idontknow = 0;
    votes.yes = 0;
    votes.no = 0;
    socket.emit('updateVotes', votes);
  });
});

server.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

//module.exports = app;
