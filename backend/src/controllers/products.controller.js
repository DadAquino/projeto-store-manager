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
 
   return response.status(201).json(result);
 };

 const updateProduct = async (request, response) => {
  const { body: { name }, params: { id } } = request;

  const result = await productsServices.update(id, name);
  
  const { error, message } = result;

  if (error) { 
    return response.status(404).json({ message });
  }

  const res = { id: parseInt(id, 10), name }; 
 
   return response.status(200).json(res);
 };

 const deletes = async (request, response) => {
    const { id } = request.params;

    const result = await productsServices.deleteProduct(id);

    const { error, message } = result;

    if (error) { 
      return response.status(404).json({ message });
    }

    return response.status(204).end();
 };

module.exports = { getProducts, getProductsById, addNewProduct, updateProduct, deletes };