const route = require('express').Router();
const salesControllers = require('../controllers/sales.controller');

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
  salesControllers.createSale,
);

module.exports = route;