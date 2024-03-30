const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const productsController = require('../../../src/controllers/products.controller');
const { allProductsFromDb, specificProduct } = require('../../mocks/products.mocks');

describe('Testando Products Controller', function () {
  it('Verifica se retorna todos os produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([allProductsFromDb]);

    await productsController.findProducts(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allProductsFromDb)).to.be.equal(true);

    connection.execute.restore();
  });

  it('Verifica se retorna um produto específico', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([specificProduct]);

    await productsController.findProductsById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(false);
    expect(res.json.calledWith(specificProduct)).to.be.equal(false);

    connection.execute.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});