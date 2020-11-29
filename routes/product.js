var express = require('express');
var router = express.Router();
var product_model = require('../model/product');

var product = {};

router.get('/', function(req, res, next) {
    product_model.getAll(function (rows) {
        res.render('product/inventory', { title : 'IDW Demo',products : rows} );
    });
});

product.add  = function(params, socket) {
    product_model.add(params, socket);
};

product.delete  = function(params, socket) {
    product_model.delete(params, socket);
};

product.router = router

module.exports = product;
