const { productsModel } = require('../models');

const listProducts = async (id) => {
    if (id) { 
        const result = await productsModel.getProductsById(id);
        
        if (!result) {
            return { message: 'Product not found' };
         }
         
        return result;
     }

     const result = await productsModel.getAllProducts();

     return result;
};

module.exports = { listProducts };