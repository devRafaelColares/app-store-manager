const connection = require('../db/connection');

const checkIfProductExists = async (productId) => {
  const [data] = await connection.execute(
    'SELECT COUNT(*) AS count FROM products WHERE id = ?',
    [productId],
  );
  const [{ count }] = data;
  return count > 0;
};
  
module.exports = checkIfProductExists;