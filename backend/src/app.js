const express = require('express');
const { salesController, productsController } = require('./controllers');
const { 
  nameValidation,
  newSaleValidation,
  updateSaleQuantityValidation,
} = require('./middlewares/validations');
const { salesModel } = require('./models');

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

 app.put(
'/sales/:saleId/products/:productId/quantity', 
 updateSaleQuantityValidation,
salesController.updateQuantity,
);

 app.get('/test', async (_request, response) => {
const result = await salesModel.getSaleById(2);

  response.json(result);
});
module.exports = app;