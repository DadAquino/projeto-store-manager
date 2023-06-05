const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { productsServices } = require('./services');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_request, response) => {
 const result = await productsServices.listProducts();

  return response.status(200).json(result);
});
app.get('/products/:id', async (request, response) => {
  const { id } = request.params;
  const result = await productsServices.listProducts(id);
 
   return response.status(200).json(result);
 });

module.exports = app;