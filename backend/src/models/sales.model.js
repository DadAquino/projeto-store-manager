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
    const [[result]] = await 
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

const insertNewSale = async (body) => {
        const [{ insertId }] = await connection
        .execute('INSERT INTO sales () VALUES ()');
      
        const saleProducts = body.map((product) =>
          connection.execute(
            `INSERT INTO sales_products 
            (product_id, quantity, sale_id) VALUES (?, ?, ?)`,
            [product.productId, product.quantity, insertId],
          ));
      
        await Promise.all(saleProducts);
      
        return insertId;
};

const updateSale = async () => {
};

const deleteSale = async (id) => {
    await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  };

  const getSaleById = async (id) => {
    const comando = `SELECT a.date, b.product_id AS productId, 
    b.quantity FROM StoreManager.sales AS a 
    INNER JOIN StoreManager.sales_products AS b ON a.id = b.sale_id WHERE a.id = ?`;
    
    const [result] = await connection.execute(comando, [id]);

    return result;
  };

module.exports = { 
    getAllSales,
    getSaleById,
    getSaleProductById,
    insertNewSale,
    updateSale,
    deleteSale,
 };