const route = require('express').Router();
const salesControllers = require('../controllers/sales.controller');
const { 
  validateProductId,
  validateProductIdExists,
  validateIfQuantityMoreThanZero,
  validateIfQuantityExist,
} = require('../middlewares/sales.middlewares');

route.get(
  '/',
  salesControllers.findAllSales,
);

route.get(
  '/:id',
  salesControllers.findSaleById,
);

route.post(
  '/',
  validateProductId,
  validateIfQuantityExist,
  validateIfQuantityMoreThanZero,
  validateProductIdExists,
  salesControllers.createSale,
);

module.exports = route;