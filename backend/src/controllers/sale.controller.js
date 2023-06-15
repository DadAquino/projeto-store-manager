const { salesServices, productsServices } = require('../services/index');

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

const insertNewSale = async (request, response) => {
    const { body } = request;

    body.forEach(async (e) => {
      const result = await productsServices.listProducts(e.productId);

    const { error, message } = result;

    if (error) {
      return response.status(404).json({ message });
    }
    });
    
    const result = await salesServices.newSale(body);
    
     return response.status(201).json(result);
   }; 

const deletes = async (request, response) => {
  const { id } = request.params;

  const result = await salesServices.deleteSale(id);

  const { error, message } = result;

  if (error) {
    return response.status(404).json({ message });
  }

  return response.status(204).end();
};
module.exports = { getSales, getSalesById, insertNewSale, deletes };