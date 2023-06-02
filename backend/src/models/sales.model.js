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

module.exports = { 
    getAllSales,
    getSaleById,
 };