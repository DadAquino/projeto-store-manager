const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { salesController, productsController } = require('./controllers');
const { salesModel, productsModel } = require('./models');
const { nameValidation } = require('./middlewares/validations');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsById);

 app.get('/sales', salesController.getSales);
 app.get('/sales/:id', salesController.getSalesById);

 app.post('/products', nameValidation, productsController.addNewProduct);
 app.post('/sales', salesController.insertNewSale);

 app.post('/products/:id', nameValidation, productsController.updateProduct);

 app.get('/test', async (_request, response) => {
const result = await productsModel.getProductsById(77);

  console.log(result);

  response.status(200).json(result);
});

module.exports = app;