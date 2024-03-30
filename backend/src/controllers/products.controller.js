const productsServices = require('../services/products.service');

const findProducts = async (req, res) => {
  const allProducts = await productsServices.allProductsModel();
  return res.status(200).json(allProducts);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.verifyIdIsString(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

module.exports = {
  findProducts,
  findProductsById,
};