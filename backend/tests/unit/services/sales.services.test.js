const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesProductsMock, newSaleMock } = require('../models/mocks/model.mocks');
const { salesServices } = require('../../../src/services');

describe('Testes das regras de negócio de Vendas da camada services', function () {
    afterEach(async function () {
        sinon.restore();
      });

   it('Testa se todos os produtos são listados caso esteja tudo ok', async function () {
        sinon.stub(salesModel, 'getAllSales').resolves(salesProductsMock);

        const result = await salesServices.listSales();

        expect(result).to.be.deep.equal(salesProductsMock);
    });

    it('Testa da busca por id', async function () {
        sinon.stub(salesModel, 'getSaleProductById').resolves([salesProductsMock[0]]);

        const id = 5;

        const result = await salesServices.listSales(id);

        expect(result).to.be.deep.equal([salesProductsMock[0]]);
    });

    it('Testa da busca por id, em casos onde o produto não existe', async function () {
        const id = 5;
        const errorResult = { error: 'SALE_NOT_FOUND', message: 'Sale not found' };

        sinon.stub(salesModel, 'getSaleProductById').resolves([]);

        const result = await salesServices.listSales(id);

        expect(result).to.be.deep.equal(errorResult);
    });

    it('Testa deletar um produto', async function () {
        const id = 5;

        sinon.stub(salesModel, 'getSaleProductById').resolves([{ id: 5 }]);
        sinon.stub(salesModel, 'deleteSale').resolves(1);

        const result = await salesServices.deleteSale(id);

        expect(result).to.be.deep.equal(true);
    });

    it('Testa deletar uma venda, caso a venda não exista', async function () {
        const id = 5;
        const resolves = [];
        const errorResult = { error: 'SALE_NOT_FOUND', message: 'Sale not found' };

        sinon.stub(salesModel, 'getSaleProductById').resolves(resolves);

        const result = await salesServices.deleteSale(id);

        expect(result).to.be.deep.equal(errorResult);
    });

    it('Testa adicionar uma nova venda', async function () {
        const id = 5;

        sinon.stub(salesModel, 'newSaleId').resolves(id);
        sinon.stub(salesModel, 'newSale').resolves(id);

        const result = await salesServices.newSale(newSaleMock);

        expect(result).to.be.deep.equal({ id, itemsSold: newSaleMock });
    });

    it('Testa atualizar a quantidade de uma venda', async function () {
        const productId = 1;
        const saleId = 1;
        const quantity = 1;
        const date = '2023-05-06T03:14:28.000Z';
        const saleModelResponse = [{ productId, quantity, date }];
        const expectReturn = { productId, quantity, date, saleId };

        sinon.stub(salesModel, 'updateQuantity').resolves(1);
        sinon.stub(salesModel, 'getSaleProductById').resolves(saleModelResponse);

        const result = await salesServices.updateQuantity(productId, saleId, quantity);

        expect(result).to.be.deep.equal(expectReturn);
    });
});