const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const productsService = require('../../../src/services/products.service');
const functionsProductsModel = require('../../../src/models/products.model');
const { specificProduct } = require('../../mocks/products.mocks');

describe('Testando Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });
      
  it('Verifica se é retornado um array', async function () {
    sinon.stub(connection, 'execute').resolves([specificProduct]);
    const result = await productsService.allProductsModel();
    expect(result).to.be.an('array');
  });

  it('Verifica se é retornado um objeto', async function () { 
    sinon.stub(connection, 'execute').resolves([specificProduct]);
    const result = await productsService.allProductsModel();
    expect(result[0]).to.be.an('object');
  });

  it('Verifica se é retornado o id do produto', async function () {
    sinon.stub(connection, 'execute').resolves([specificProduct]);
    const result = await productsService.allProductsModel();
    expect(result[0]).to.have.property('id');
  });

  it('Verifica se é retornado o nome do produto', async function () {
    sinon.stub(connection, 'execute').resolves([specificProduct]);
    const result = await productsService.allProductsModel();
    expect(result[0]).to.have.property('name');
  });

  it('Deve retornar null se o nome do produto não for fornecido', async function () {
    const id = 1;
    const name = null;
    const updateProductStub = sinon.stub(functionsProductsModel, 'updateProduct');

    const result = await productsService.updateProductModel(id, name);

    expect(result).to.be.equal(null);
    expect(updateProductStub.called).to.be.equal(false);
  });

  it('Deve chamar a função updateProduct com os parâmetros corretos', async function () {
    const id = 1;
    const name = 'Novo Nome';
    const expectedResult = { id: 1, name: 'Novo Nome' };
    const updateProductStub = sinon.stub(functionsProductsModel, 'updateProduct').resolves(expectedResult);

    const result = await productsService.updateProductModel(id, name);

    expect(result).to.deep.equal(expectedResult);
    expect(updateProductStub.calledOnceWithExactly(id, name)).to.be.equal(true);
  });

  it('Deve retornar um produto pelo ID', async function () {
    const id = '1';
    sinon.stub(functionsProductsModel, 'findProductById').resolves(specificProduct);

    const result = await productsService.verifyIdIsString(id);

    expect(result).to.deep.equal(specificProduct);
  });

  it('Deve retornar null se o ID não for uma string numérica', async function () {
    const id = 'abc';
    const result = await productsService.verifyIdIsString(id);

    expect(result).to.be.equal(null);
  });

  it('Deve retornar null se o ID não for fornecido', async function () {
    const id = null;
    const result = await productsService.verifyIdIsString(id);

    expect(result).to.be.equal(null);
  });

  it('Deve criar um novo produto', async function () {
    const name = 'Novo Produto';
    const expectedResult = { id: 1, name: 'Novo Produto' };
    sinon.stub(functionsProductsModel, 'createProduct').resolves(expectedResult);

    const result = await productsService.createProductModel(name);

    expect(result).to.deep.equal(expectedResult);
  });

  it('Deve retornar null se o nome do produto não for fornecido ao criar', async function () {
    const name = null;
    const result = await productsService.createProductModel(name);

    expect(result).to.be.equal(null);
  });

  it('Deve excluir um produto pelo ID', async function () {
    const id = '1';
    const expectedResult = { id: '1', name: 'Produto Excluído' };
    sinon.stub(functionsProductsModel, 'deleteProduct').resolves(expectedResult);

    const result = await productsService.deleteProductModel(id);

    expect(result).to.deep.equal(expectedResult);
  });

  it('Deve retornar null se o ID não for fornecido ao excluir', async function () {
    const id = null;
    const result = await productsService.deleteProductModel(id);

    expect(result).to.be.equal(null);
  });
});
