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

const update = async (id, name) => {
    if (!id) {
        return { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
    const product = await productsModel.getProductsById(id);

    if (!product) {
        return { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
     }

    const result = await productsModel.updateProduct(id, name);

    return result;
};

const deleteProduct = async (id) => {
    const product = await productsModel.getProductsById(id);

    if (!product) {
        return { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
     }

    await productsModel.deleteProduct(id);

    return true;
};

module.exports = { listProducts, addProduct, update, deleteProduct };