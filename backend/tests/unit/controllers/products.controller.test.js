const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsMock } = require('../models/mocks/model.mocks');
const { productsController } = require('../../../src/controllers');
// const { hasName } = require('../../../src/middlewares/validations');

describe('Testes da camada Controller de Products', function () {
    afterEach(sinon.restore);

    it('Listando todos os produtos', async function () {
        sinon.stub(productsServices, 'listProducts').resolves(productsMock);
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsMock);
    });

    it('Listando produto por Id', async function () {
        sinon.stub(productsServices, 'listProducts').resolves(productsMock[0]);
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getProductsById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsMock[0]);
    });

    it('Listando produto por Id, caso o produto não exista', async function () {
        const error = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

        sinon.stub(productsServices, 'listProducts').resolves(error);
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getProductsById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: error.message });
    });

    it('Adicionando um novo produto', async function () {
        const productResolves = { id: 5, name: 'productX' };

        sinon.stub(productsServices, 'addProduct').resolves(productResolves);
        const req = { body: { name: productResolves.name } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.addNewProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productResolves);
    });

    it('Testa a atualização de um produto', async function () {
        sinon.stub(productsServices, 'update').resolves(1);

        const req = { body: { name: 'productY' }, params: { id: 5 } };
        const res = {};
        const response = { id: req.params.id, name: req.body.name };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.updateProduct(req, res);

        expect(res.status).to.be.calledWith(201);
        expect(res.json).to.be.calledWith(response);
    });
    it('Testa a atualização de um produto, caso o id não exista', async function () {
        const error = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
        sinon.stub(productsServices, 'update').resolves(error);

        const req = { body: { name: 'productY' }, params: { id: 99 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.updateProduct(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: error.message });
    });

    it('Testa deletetar um produto', async function () {
        sinon.stub(productsServices, 'deleteProduct').resolves(true);

        const req = { params: { id: 5 } };
        const res = {};
        const end = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(end);
        res.end = sinon.stub().returns();

        await productsController.deletes(req, res);

        expect(res.status).to.be.calledWith(204);
    });

    it('Testa deletetar um produto, caso não exista', async function () {
        const resolves = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
        sinon.stub(productsServices, 'deleteProduct').resolves(resolves);

        const req = { params: { id: 5 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.deletes(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: resolves.message });
    });
});