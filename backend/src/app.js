const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { salesController, productsController } = require('./controllers');
const { salesModel } = require('./models');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsByid);

 app.get('/sales', salesController.getSales);
 app.get('/sales/:id', salesController.getSalesById);

 app.post('/products', productsController.addNewProduct);

 app.get('/test', async (_request, response) => {
const result = await salesModel.updateSale(1, 2, 50);

  console.log(result);

  response.status(200).json(result);
});

module.exports = app;