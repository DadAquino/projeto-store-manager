const express = require('express');
const { salesModel } = require('./models');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/test', async (_request, response) => {
 const result = await salesModel.getSaleById(2);

  return response.status(200).json({ result });
});

module.exports = app;