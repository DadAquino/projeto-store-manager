const { salesServices } = require('../services/index');

const getSales = async (_request, response) => {
    const result = await salesServices.listSales();
 
    return response.status(200).json(result);
};  

const getSalesById = async (request, response) => {
    const { id } = request.params;
    const result = await salesServices.listSales(id);
   
    const { error, message } = result;
 
    if (error) { 
     return response.status(404).json({ message });
    }
     return response.status(200).json(result);
   };  

module.exports = { getSales, getSalesById };