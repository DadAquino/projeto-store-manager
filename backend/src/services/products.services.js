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

module.exports = { listProducts };