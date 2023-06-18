const { salesServices, productsServices } = require('../services/index');

const getSales = async (_request, response) => {
    const result = await salesServices.listSales();
 
    return response.status(200).json(result);
};  

const getSalesById = async (request, response) => {
    const { id } = request.params;
    const result = await salesServices.listSales(id);
   
    const { error, message } = result;
 
    if (error) { 
     return response.status(404).json({ message });
    }
     return response.status(200).json(result);
   };  

const insertNewSale = async (request, response) => {
    const { body } = request;

    let test;

    await Promise.all(body.map(async (e) => {
    const result = await productsServices.listProducts(e.productId);

    const { error, message } = result;

    if (error) {
      test = message;
    }
}));

    if (test) {
      return response.status(404).json({ message: test });
    }
    
    const result = await salesServices.newSale(body);
    
     return response.status(201).json(result);
   }; 

const deletes = async (request, response) => {
  const { id } = request.params;

  const result = await salesServices.deleteSale(id);

  const { error, message } = result;

  if (error) {
    return response.status(404).json({ message });
  }

  return response.status(204).end();
};

const updateQuantity = async (req, res) => {
  const { params: { productId, saleId }, body: { quantity } } = req;

  const searchProduct = await productsServices.listProducts(productId);
  const searchSale = await salesServices.listSales(saleId);

  if (searchProduct.error) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }

  if (searchSale.error) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  const result = await salesServices.updateQuantity(productId, saleId, quantity);

  return res.status(200).json(result);
};

module.exports = { getSales, getSalesById, insertNewSale, deletes, updateQuantity };