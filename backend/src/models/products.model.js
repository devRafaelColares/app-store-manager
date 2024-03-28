const camelize = require('camelize');
const connection = require('../db/connection');

const findAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products); 
};

module.exports = {
  findAllProducts,
};