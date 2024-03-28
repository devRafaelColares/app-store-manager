const camelize = require('camelize');
const connection = require('../db/connection');

const findAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products); 
};

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return camelize(product);
};
module.exports = {
  findAllProducts,
  findProductById,
};