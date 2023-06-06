const { productsServices } = require('../services');

const getProducts = async (_request, response) => {
    const result = await productsServices.listProducts();
   
     return response.status(200).json(result);
   };

const getProductsByid = async (request, response) => {
  const { id } = request.params;
  const result = await productsServices.listProducts(id);

  const { error, message } = result;
  
  if (error) { 
    return response.status(404).json({ message });
   }

   return response.status(200).json(result);
 };

module.exports = { getProducts, getProductsByid };