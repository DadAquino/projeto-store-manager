const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesProductsMock,
    newSaleResponse,
    salesMock,
    productsMock } = require('../models/mocks/model.mocks');
const { salesServices, productsServices } = require('../../../src/services');

describe('Testes da camada Controller de Sales', function () {
    afterEach(sinon.restore);

    it('Listando todos as vendas', async function () {
        sinon.stub(salesServices, 'listSales').resolves(salesProductsMock);
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.getSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesProductsMock);
    });

    it('Listando vendas por Id', async function () {
        sinon.stub(salesServices, 'listSales').resolves(salesProductsMock[0]);
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.getSalesById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesProductsMock[0]);
    });

    it('Listando vendas por Id, caso Id passado não exista', async function () {
        const error = { error: 'SALE_NOT_FOUND', message: 'Sale not found' };

        sinon.stub(salesServices, 'listSales').resolves(error);
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.getSalesById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: error.message });
    });
    it('Cadastro de um novo produto', async function () {
        sinon.stub(salesServices, 'newSale').resolves(newSaleResponse);
        sinon.stub(productsServices, 'listProducts').resolves({ oi: 'oi' });
        const req = { body: newSaleResponse.itemsSold };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.insertNewSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newSaleResponse);
    });

    it('Cadastro de um novo produto, caso produto não exista', async function () {
        const error = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

        sinon.stub(salesServices, 'newSale').resolves(newSaleResponse);
        sinon.stub(productsServices, 'listProducts').resolves(error);

        const req = { body: newSaleResponse.itemsSold };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.insertNewSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: error.message });
    });

    it('deletando um produto', async function () {
        sinon.stub(salesServices, 'deleteSale').resolves(true);
        const req = { params: { id: 5 } };
        const res = {};
        const end = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(end);
        res.end = sinon.stub().returns();

        await salesController.deletes(req, res);

        expect(res.status).to.have.been.calledWith(204);
    });

    it('deletando um produto, caso produto não exista', async function () {
        const error = { error: 'SALE_NOT_FOUND', message: 'Sale not found' };

        sinon.stub(salesServices, 'deleteSale').resolves(error);
        const req = { params: { id: 5 } };
        const res = {};
        const end = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(end);
        res.end = sinon.stub().returns();

        await salesController.deletes(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: error.message });
    });

    it('Testando a atualização da quantidade do produto na venda', async function () {
        const productId = 1;
        const saleId = 1;
        const quantity = 1;
        const date = '2023-05-06T03:14:28.000Z';
        const saleServiceReturn = { productId, quantity, date, saleId };

        sinon.stub(salesServices, 'updateQuantity').resolves(saleServiceReturn);
        sinon.stub(salesServices, 'listSales').resolves(salesMock[0]);
        sinon.stub(productsServices, 'listProducts').resolves(productsMock[0]);

        const req = { params: { productId, saleId }, body: { quantity } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.updateQuantity(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleServiceReturn);
    });

    it('Testando a atualização, caso o produto não exista', async function () {
        const productId = 1;
        const saleId = 1;
        const quantity = 1;
        const date = '2023-05-06T03:14:28.000Z';
        const saleServiceReturn = { productId, quantity, date, saleId };
        const error = { error: 'PRODUCT_NOT_FOUND' };

        sinon.stub(salesServices, 'updateQuantity').resolves(saleServiceReturn);
        sinon.stub(salesServices, 'listSales').resolves(salesMock[0]);
        sinon.stub(productsServices, 'listProducts').resolves(error);

        const req = { params: { productId, saleId }, body: { quantity } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.updateQuantity(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
    });

    it('Testando a atualização, caso a venda não exista', async function () {
        const productId = 1;
        const saleId = 1;
        const quantity = 1;
        const date = '2023-05-06T03:14:28.000Z';
        const saleServiceReturn = { productId, quantity, date, saleId };
        const error = { error: 'SALE_NOT_FOUND' };

        sinon.stub(salesServices, 'updateQuantity').resolves(saleServiceReturn);
        sinon.stub(salesServices, 'listSales').resolves(error);
        sinon.stub(productsServices, 'listProducts').resolves(productsMock[0]);

        const req = { params: { productId, saleId }, body: { quantity } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.updateQuantity(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
});