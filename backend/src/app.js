const express = require('express');
const { newProductMock, newSaleMock } = require('../tests/unit/models/mocks/model.mocks');
const { insertNewSale } = require('./models/sales.model');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/test', async (_request, response) => {
 const result = await insertNewSale(newSaleMock);

  return response.status(200).json(result);
});

module.exports = app;