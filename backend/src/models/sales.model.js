const connection = require('./connection');

const getAllSales = async () => {
    const [result] = await connection.execute(`SELECT 
    salesp.sale_id AS saleId,     
    salesp.product_id AS productId, 
    salesp.quantity,
    s.date    
  FROM sales_products AS salesp 
  INNER JOIN sales AS s 
  ON s.id = salesp.sale_id 
  ORDER BY salesp.sale_id, salesp.product_id;`);
    
    return result;
};

const getSaleProductById = async (id) => {
    const [result] = await 
    connection.execute(
`SELECT 
    salesp.product_id AS productId, 
    salesp.quantity,
    s.date    
  FROM sales_products AS salesp 
  INNER JOIN sales AS s 
  ON s.id = salesp.sale_id 
  Where salesp.sale_id = ?
  ORDER BY salesp.sale_id, salesp.product_id;`, 
  [id],
);
    
    return result;
};

const newSaleId = async () => {
  /*
  const [[result]] = await connection.execute(
    'SELECT MAX(id) AS id FROM sales',
  );

  const lastId = Object.values(result);

  const newId = lastId[0] + 1;

  await connection.execute(
    'INSERT INTO sales (id) VALUE (?)',
    [newId],
    );

  return newId;
  */

  const [{ insertId }] = await connection.execute('INSERT INTO sales () VALUE ()');

  return insertId;
};

const newSale = async (newId, sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [newId, sale.productId, sale.quantity],
  );

  return insertId;
};

/*
const updateSale = async (saleId, productId, quantity) => {
  console.log(saleId, productId, quantity, 'model');
  await connection.execute(
    `UPDATE sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );

  const [[result]] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity, sp.sale_id AS saleId
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ? AND sp.product_id = ?;`,
    [saleId, productId],
  );

  return result;
};

*/

const deleteSale = async (id) => {
   const [{ affectedRows }] = await 
   connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);

   return affectedRows;
  };

module.exports = { 
    getAllSales,
    getSaleProductById,
    newSale,
    newSaleId,
    // updateSale,
    deleteSale,
 };