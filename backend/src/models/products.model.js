const camelize = require('camelize');
const connection = require('../db/connection');

const findAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products); 
};

const findProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return camelize(product);
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};