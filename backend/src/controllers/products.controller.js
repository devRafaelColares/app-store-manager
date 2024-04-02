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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsServices.createProductModel(name);
  return res.status(201).json({ id: product, name });
};

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;
  const product = await productsServices.updateProductModel(id, name);
  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsServices.deleteProductModel(id);
  return res.status(204).json();
};

module.exports = {
  findProducts,
  findProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};