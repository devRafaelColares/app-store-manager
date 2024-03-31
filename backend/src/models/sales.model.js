const camelize = require('camelize');
const connection = require('../db/connection');

const getAllSalesWithData = async () => {
  const [sales] = await connection.execute(
    `SELECT 
        sp.sale_id AS saleId, 
        s.date,
        sp.product_id AS productId, 
        sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id`,
  );

  return camelize(sales);
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return camelize(sale);
};

const createSale = async (salesData) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  const salesProducts = salesData.map((sale) => [insertId, sale.productId, sale.quantity]);

  const valuesString = salesProducts.map((product) => `(${product.join(', ')})`).join(', ');
  const sql = `INSERT INTO StoreManager
  .sales_products (sale_id, product_id, quantity) VALUES ${valuesString}`;

  await connection.execute(sql);

  return { id: insertId, itemsSold: salesData };
};

module.exports = {
  getAllSalesWithData,
  getSaleById,
  createSale,
};