const { getProductsById, getAllProducts } = require('../models/product.model');

const listProducts = async (id) => {
    if (id) { 
        const result = await getProductsById(id);
        
        if (!result) {
            return { message: 'Product not found' };
         }
         
        return result;
     }

     const result = await getAllProducts();

     return result;
};

module.exports = { listProducts };