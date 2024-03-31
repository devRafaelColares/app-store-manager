const route = require('express').Router();
const productsControllers = require('../controllers/products.controller');
const validateProduct = require('../middlewares/validateProduct');

route.get(
  '/',
  productsControllers.findProducts,
);

route.get(
  '/:id',
  productsControllers.findProductsById,
);

route.post(
  '/',
  validateProduct,
  productsControllers.createProduct,
);

module.exports = route;