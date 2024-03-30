const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesController = require('../../../src/controllers/sales.controller');
const { allSales, saleById } = require('../../mocks/sales.mocks');

describe('Testando Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando a listagem de todas as vendas', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([allSales]);
    await salesController.findAllSales(req, res);
    
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSales)).to.be.equal(true);
  });
  it('Testando a listagem de uma venda pelo id', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([saleById]);

    await salesController.findSaleById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(false);
    expect(res.json.calledWith(saleById)).to.be.equal(false);
  });
});