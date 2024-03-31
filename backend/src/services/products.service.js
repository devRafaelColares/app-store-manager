const functionsProductsModel = require('../models/products.model');

const allProductsModel = async () => functionsProductsModel.findAllProducts();

const verifyIdIsString = async (id) => {
  if (typeof id === 'string' && /^\d+$/.test(id)) {
    const productById = await functionsProductsModel.findProductById(id);
    return productById;
  }
  return null;
};

const createProductModel = async (name) => {
  if (!name) return null;
  return functionsProductsModel.createProduct(name);
};

module.exports = {
  verifyIdIsString,
  allProductsModel,
  createProductModel,
};