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

    /*
    it('Testa validações para adicionar produtos', async function () {
       // const errorMessage = { message: '"name" is required' };

        const req = { body: {} };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.addNewProduct(req, res);

        expect(hasName).to.have.been.called();
    });
    */
});