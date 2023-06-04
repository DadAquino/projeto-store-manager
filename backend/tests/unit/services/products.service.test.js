const { expect } = require('chai');
const sinon = require('sinon');

const { productsServices } = require('../../../src/services/index');
const { productsModel } = require('../../../src/models/index');
const { productsMock } = require('../models/mocks/model.mocks');

describe('Testes das regras de negócio de produtos da camada services', function () {
    it('Testa se todos os produtos são listados caso esteja tudo ok', async function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(productsMock);

        const result = await productsServices.listProducts(undefined);

        expect(result).to.be.deep.equal(productsMock);
    });

    it('Testa se o produto do id passado é exibido caso esteja tudo ok', async function () {
        sinon.stub(productsModel, 'getProductsById').resolves(productsMock[0]);

        const id = 1;

        const result = await productsServices.listProducts(id);

        expect(result).to.be.deep.equal(productsMock[0]);
    });
});
