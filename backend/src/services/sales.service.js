const salesModel = require('../models/sales.model');

const allSalesService = async () => {
  const sales = await salesModel.getAllSalesWithData();
  return sales;
};

const saleByIdService = async (id) => {
  if (typeof id === 'string' && /^\d+$/.test(id)) {
    const sale = await salesModel.getSaleById(id);
    return sale;
  }
  return null;
};

const createSaleService = async (body) => {
  if (body) {
    const sale = await salesModel.createSale(body);
    return sale;
  }
  return null;
};

module.exports = {
  allSalesService,
  saleByIdService,
  createSaleService,
};