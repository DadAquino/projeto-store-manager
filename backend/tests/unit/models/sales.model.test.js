const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesMock, newSaleMock } = require('./mocks/model.mocks');
const { salesProductsMock } = require('./mocks/model.mocks');

describe('Testes da camada model de Sales', function () {
    afterEach(sinon.restore);

    it('Listando todas as vendas', async function () {
        sinon.stub(connection, 'execute').resolves([salesMock]);

        const result = await salesModel.getAllSales();

        expect(result).to.be.deep.equal(salesMock);
    });

    it('Listando listando sale por id', async function () {
        sinon.stub(connection, 'execute').resolves([[salesProductsMock[2]]]);

        const id = 2;

        const result = await salesModel.getSaleProductById(id);

        expect(result).to.be.deep.equal([salesProductsMock[2]]);
    });

    it('Realizando um cadastro de venda', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

        const newId = 2;

        const result = await salesModel.newSale(newId, newSaleMock);

        expect(result).to.be.deep.equal({ insertId: 2 });
    });

    it('Deletando uma venda', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1, changedRows: 1 }]);

        const id = 1;
        
        const result = await salesModel.deleteSale(id);

        expect(result).to.be.equal(1);
    });
});