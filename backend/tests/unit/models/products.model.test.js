const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { productsMock, newProductMock, newProductResponse } = require('./mocks/model.mocks');

describe('Testes da camada model de Products', function () {
    afterEach(sinon.restore);

    it('Listando todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([productsMock]);

        const result = await productsModel.getAllProducts();

        expect(result).to.be.deep.equal(productsMock);
    });

    it('Listando listando products por id', async function () {
        sinon.stub(connection, 'execute').resolves([productsMock[0]]);

        const id = 1;

        const result = await productsModel.getProductsById(id);

        expect(result).to.be.deep.equal(productsMock[0]);
    });

    it('Realizando um cadastro de produto', async function () {
        sinon.stub(connection, 'execute').resolves(newProductResponse);

        const result = await productsModel.insertNewProduct(newProductMock);

        expect(result).to.be.deep.equal(4);
    });
});
