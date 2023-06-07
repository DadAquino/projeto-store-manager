const { salesModel } = require('../models');

const listSales = async (id) => {
        if (id) { 
            const result = await salesModel.getSaleProductById(id);
            
            if (result === undefined) {
                return { error: 'SALE_NOT_FOUND', message: 'Sale not found' };
             }
             
            return result;
         }
    
         const result = await salesModel.getAllSales();
    
         return result;
    };
    
module.exports = { listSales };