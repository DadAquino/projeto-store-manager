// products

const productsMock = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do CapitÃ£o AmÃ©rica',
    },
  ];

  const newProductMock = {
    name: 'ProdutoX',
  };

  const newProductResponse = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    },
    null,
  ];

// sales

const salesMock = [
  {
    id: 1,
    date: '2023-06-01T20:35:33.000Z',
  },
  {
    id: 2,
    date: '2023-06-01T20:35:33.000Z',
  },
  ];

const newSaleMock = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ];

  const newSaleResponse = {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  };

  // sales_Products
  const salesProductsMock = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
    },
  ];

  // export
  module.exports = { 
    productsMock,
    salesMock,
    salesProductsMock,
    newProductMock,
    newProductResponse,
    newSaleMock,
    newSaleResponse, 
  };