const { productsServices } = require('../services');

const getProducts = async (_request, response) => {
    const result = await productsServices.listProducts();
   
     return response.status(200).json(result);
   };

const getProductsById = async (request, response) => {
  const { id } = request.params;
  const result = await productsServices.listProducts(id);

  const { error, message } = result;
  
  if (error) { 
    return response.status(404).json({ message });
   }

   return response.status(200).json(result);
 };

 const addNewProduct = async (request, response) => {
  const { body } = request;

  const result = await productsServices.addProduct(body);
 
   response.status(201).json(result);
 };

module.exports = { getProducts, getProductsById, addNewProduct };