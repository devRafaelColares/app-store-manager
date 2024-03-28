const route = require('express').Router();
const productsControllers = require('../controllers/products.controller');

route.get(
  '/',
  productsControllers.findProducts,
);

route.get(
  '/:id',
  productsControllers.findProductsById,
);

module.exports = route;