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
    const [result] = await Promise.all(response);

    return { id: newId, itemsSold: result };
};
    
module.exports = { listSales, newSale };