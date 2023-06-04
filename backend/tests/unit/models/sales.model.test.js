const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesMock, newSaleMock } = require('./mocks/model.mocks');

describe('Testes da camada model de Sales', function () {
    afterEach(sinon.restore);

    it('Listando todas as vendas', async function () {
        sinon.stub(connection, 'execute').resolves([salesMock]);

        const result = await salesModel.getAllSales();

        expect(result).to.be.deep.equal(salesMock);
    });

    it('Listando listando sale por id', async function () {
        sinon.stub(connection, 'execute').resolves([[salesMock[0]]]);

        const id = 1;

        const result = await salesModel.getSaleById(id);

        expect(result).to.be.deep.equal(salesMock[0]);
    });

    it('Realizando um cadastro de venda', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

        const result = await salesModel.insertNewSale(newSaleMock);

        expect(result).to.be.deep.equal(2);
    });
});