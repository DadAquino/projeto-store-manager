const express = require('express');
const { newProduct } = require('./models/product.model');
const { newProductMock } = require('../tests/unit/models/mocks/model.mocks');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/test', async (_request, response) => {
 const result = await newProduct(newProductMock);

  return response.status(200).json(result);
});

module.exports = app;