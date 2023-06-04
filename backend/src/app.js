const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { getAllSales } = require('./models/sales.model');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/test', async (_request, response) => {
 const result = await getAllSales();

  return response.status(200).json(result);
});

module.exports = app;