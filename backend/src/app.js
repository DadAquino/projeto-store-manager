const express = require('express');
// const { getAllProducts, deleteProducts, updateProduct } = require('./models/product.model');
const { salesController, productsController } = require('./controllers');
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

 app.put('/products/:id', nameValidation, productsController.updateProduct);

module.exports = app;