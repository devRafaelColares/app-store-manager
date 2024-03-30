const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const productsService = require('../../../src/services/products.service');
const { specificProduct } = require('../../mocks/products.mocks');

describe('Testando Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });
      
  it('Teste se é retornado um array', async function () {
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
});
