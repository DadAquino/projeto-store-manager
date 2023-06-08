const { expect } = require('chai');
const sinon = require('sinon');
const { productsMock } = require('../models/mocks/model.mocks');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');

describe('Testes das regras de negócio de produtos da camada services', function () {
    afterEach(async function () {
        sinon.restore();
      });

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

    it('Testa se o produto se é retornado um erro caso o produto não exista', async function () {
        const errorResult = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
        const id = 1;

        sinon.stub(productsModel, 'getProductsById').resolves(undefined);

        const result = await productsServices.listProducts(id);

        expect(result).to.be.deep.equal(errorResult);
    });

    it('Testa se o produto é adicionado corretamente', async function () {
        const resolvesId = 5;
        const req = { name: 'produtoB' };
        const res = { id: resolvesId, name: req.name };

        sinon.stub(productsModel, 'insertNewProduct').resolves(resolvesId);

        const result = await productsServices.addProduct(req);

        expect(result).to.be.deep.equal(res);
    });

    it('Testa a atualização do produto', async function () {
        const id = 5;
        const name = 'productX';
        const name2 = 'productY';

        sinon.stub(productsModel, 'updateProduct').resolves(1);
        sinon.stub(productsModel, 'getProductsById').resolves({ id, name });

        const result = await productsServices.update(id, name2);

        expect(result).to.be.deep.equal(1);
    });

    it('Testa a atualização do produt, caso produto não exista', async function () {
        const id = 5;
        const name = 'productX';
        const error = { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

        sinon.stub(productsModel, 'getProductsById').resolves(undefined);

        const result = await productsServices.update(id, name);

        expect(result).to.be.deep.equal(error);
    });
});
