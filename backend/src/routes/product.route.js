const route = require('express').Router();
const productsControllers = require('../controllers/products.controller');
const { validateProduct, validateProductExists } = require('../middlewares/products.middlewares');

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

route.put(
  '/:id',
  validateProduct,
  validateProductExists,
  productsControllers.updateProduct,
);

route.delete(
  '/:id',
  validateProductExists,
  productsControllers.deleteProduct,
);

module.exports = route;