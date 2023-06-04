const connection = require('./connection');

const getAllSales = async () => {
    const [result] = await connection.execute('SELECT * FROM  StoreManager.sales;');
    
    return result;
};

const getSaleById = async (id) => {
    const [result] = await 
    connection.execute('SELECT * FROM  StoreManager.sales WHERE id = ?;', [id]);
    
    return result;
};

const insertNewSale = async (body) => {
    const columns = Object.keys(body).join(', ');

    const placeholders = Object.keys(body).map((_key) => '?').join(', ');

    const [{ insertId }] = await connection.execute(
`INSERT INTO sales (${columns}) VALUE (${placeholders})`,
    [...Object.values(body)],
  );

  return insertId;
};

module.exports = { 
    getAllSales,
    getSaleById,
    insertNewSale,
 };