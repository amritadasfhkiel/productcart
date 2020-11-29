var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var user = require('./routes/user');
var product = require('./routes/product');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000, function(){
    console.log('Instant Merge is now listening on 3000!');
});

var io = require('socket.io')(http);
io.on('connection', function(socket){
    socket.on('initialized', function () {
        console.log('A socket initialized!');
    });
    socket.on('user_login', function (params) {
      user.validate(params, socket);
    });
    socket.on('product_add', function (params) {
        product.add(params, socket);
    });
    socket.on('product_delete', function (params) {
        product.delete(params, socket);
    });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', user.router);
app.use('/user', user.router);
app.use('/product', product.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
