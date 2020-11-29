var express = require('express');
var router = express.Router();
var user_model = require('../model/user');

var user = {};

router.get('/', function(req, res, next) {
  res.render('user/login', { title : 'IDW Demo'} );
});

user.validate  = function(params, socket) {
  user_model.validate(params, socket);
}

user.router = router

module.exports = user;
