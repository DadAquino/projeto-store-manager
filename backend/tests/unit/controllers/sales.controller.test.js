const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesProductsMock } = require('../models/mocks/model.mocks');
const { salesServices } = require('../../../src/services');

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
});