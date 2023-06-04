const connection = require('./connection');

const getAllProducts = async () => {
    const [result] = await connection.execute('SELECT * FROM  StoreManager.products;');
    
    return result;
};

const getProductsById = async (id) => {
    const [result] = await 
    connection.execute('SELECT * FROM  StoreManager.products WHERE id = ?;', [id]);
    
    return result;
};

const insertNewProduct = async (body) => {
    const columns = Object.keys(body).join(', ');

    const placeholders = Object.keys(body).map((_key) => '?').join(', ');

    const [{ insertId }] = await connection.execute(
`INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(body)],
  );

  return insertId;
};

const updateProduct = async (body) => {
    const { id, name } = body;

    const [{ affectedRows }] = await 
    connection.execute('UPDATE StoreManager.products SET name = ? WEHERE id = ?', [name, id]);

    return affectedRows;
};

module.exports = { 
    getAllProducts,
    getProductsById,
    insertNewProduct,
    updateProduct,
};