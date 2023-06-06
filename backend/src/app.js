const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { salesController, productsController } = require('./controllers');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsByid);

 app.get('/sales', salesController.getSales);
 app.get('/sales/:id', salesController.getSalesById);

module.exports = app;