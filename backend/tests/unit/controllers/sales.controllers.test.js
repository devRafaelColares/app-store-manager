const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesController = require('../../../src/controllers/sales.controller');
const { allSales, saleById, salesData } = require('../../mocks/sales.mocks');

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

  it('Testando se é possível cadastrar uma nova venda', async function () {
    const req = { body: salesData };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    await salesController.createSale(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, itemsSold: salesData })).to.be.equal(true);
    expect(res.json.calledWith({})).to.be.equal(false);
    expect(res.json.calledWith({ id: 1 })).to.be.equal(false);
    expect(res.json.calledWith({ itemsSold: salesData })).to.be.equal(false);
    expect(res.json.calledWith({ id: 1, salesData })).to.be.equal(false);
  });
});