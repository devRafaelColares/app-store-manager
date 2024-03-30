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

module.exports = {
  getAllSalesWithData,
  getSaleById,
};