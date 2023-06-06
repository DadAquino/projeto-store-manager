const { salesModel } = require('../models');

const listSales = async (id) => {
        if (id) { 
            const result = await salesModel.getSaleById(id);
            
            if (result.length === 0) {
                return { message: 'Sale not found' };
             }
             
            return result;
         }
    
         const result = await salesModel.getAllSales();
    
         return result;
    };
    
module.exports = { listSales };