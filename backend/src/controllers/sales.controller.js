const salesServices = require('../services/sales.service');

const findAllSales = async (req, res) => {
  const allSales = await salesServices.allSalesService();
  return res.status(200).json(allSales);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.saleByIdService(id);
  if (!sale || sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const createSale = async (req, res) => {
  const { body } = req;
  const sale = await salesServices.createSaleService(body);
  if (!sale) return res.status(500).json({ message: 'Internal server error' });
  return res.status(201).json(sale);
};

module.exports = {
  findAllSales,
  findSaleById,
  createSale,
};