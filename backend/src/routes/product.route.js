const route = require('express').Router();
const productsControllers = require('../controllers/products.controller');

route.get(
  '/',
  productsControllers.findProducts,
);

module.exports = route;