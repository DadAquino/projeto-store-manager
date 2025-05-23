const { salesModel } = require('../models');

const listSales = async (id) => {
        if (id) { 
            const result = await salesModel.getSaleProductById(id);
            
            if (result.length === 0) {
                return { error: 'SALE_NOT_FOUND', message: 'Sale not found' };
             }
             
            return result;
         }
    
         const result = await salesModel.getAllSales();
    
         return result;
    };

const newSale = async (body) => {
    const newId = await salesModel.newSaleId();

    const response = await body.map((sale) => salesModel.newSale(newId, sale));
    await Promise.all(response);

    return { id: newId, itemsSold: body };
};

const deleteSale = async (id) => {
    const result = await salesModel.getSaleProductById(id);

    if (result.length === 0) {
        return { error: 'SALE_NOT_FOUND', message: 'Sale not found' };
    }

    await salesModel.deleteSale(id);

    return true;
};

const updateQuantity = async (productId, saleId, quantity) => {
    const result = await salesModel.updateQuantity(productId, saleId, quantity);
    console.log(result);

    const [{ date }] = await salesModel.getSaleProductById(saleId);

    const obj = { productId: Number(productId), saleId: Number(saleId), quantity, date };

    return obj;
    };
    
module.exports = { listSales, newSale, deleteSale, updateQuantity };