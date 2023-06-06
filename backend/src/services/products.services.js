const { productsModel } = require('../models');

const listProducts = async (id) => {
    if (id) { 
        const result = await productsModel.getProductsById(id);
        
        if (!result) {
            return { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
         }
         
        return result;
     }

     const result = await productsModel.getAllProducts();

     return result;
};

const addProduct = async (body) => {
    const result = await productsModel.insertNewProduct(body);

    return { id: result, name: body.name };
};

module.exports = { listProducts, addProduct };