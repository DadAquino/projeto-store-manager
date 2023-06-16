const express = require('express');
const { salesController, productsController } = require('./controllers');
const { nameValidation, newSaleValidation } = require('./middlewares/validations');
const { productsServices } = require('./services');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
    response.json({ status: 'Store Manager UP!' });
  });

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsById);

 app.get('/sales', salesController.getSales);
 app.get('/sales/:id', salesController.getSalesById);

 app.post('/products', nameValidation, productsController.addNewProduct);
 app.post('/sales', newSaleValidation, salesController.insertNewSale);

 app.put('/products/:id', nameValidation, productsController.updateProduct);
 app.delete('/products/:id', productsController.deletes);
 
 app.delete('/sales/:id', salesController.deletes);

 app.get('/test', async (_request, response) => {
const result = await productsServices.update(1, 'joãoPedro');

  response.json(result);
});
module.exports = app;