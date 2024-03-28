const findAllProductsModel = require('../models/products.model');

const findProducts = async (req, res) => {
  const allProducts = await findAllProductsModel.findAllProducts();
  return res.status(200).json(allProducts);
};

module.exports = {
  findProducts,
};