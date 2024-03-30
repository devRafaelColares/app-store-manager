const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const productsModel = require('../../../src/models/products.model');
const { allProductsFromDb, specificProduct } = require('../../mocks/products.mocks');

describe('Testando Products Model', function () {
  it('Verifica se é possível listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDb]);

    const result = await productsModel.findAllProducts();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have.a.property('id');
    expect(result[0]).to.have.a.property('name');
    expect(result).to.deep.equal(allProductsFromDb);
  });

  it('Verifica se é possível listar um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([[specificProduct]]);

    const result = await productsModel.findProductById(1);

    expect(result).to.be.an('array');
    expect(result).to.deep.equal(specificProduct);
    expect(result).to.be.instanceOf(Array);
  });

  afterEach(function () {
    sinon.restore();
  });
});