const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesController = require('../../../src/controllers/sales.controller');
const salesServices = require('../../../src/services/sales.service');
const { allSales, salesData } = require('../../mocks/sales.mocks');

describe('Testando Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica a listagem de todas as vendas', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([allSales]);
    await salesController.findAllSales(req, res);
    
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSales)).to.be.equal(true);
  });

  it('Verifica a listagem de uma venda pelo id', async function () {
    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
    const saleById = { id: 1, itemsSold: [{ productId: 1, quantity: 1 }] };
    sinon.stub(salesServices, 'saleByIdService').resolves(saleById);
  
    await salesController.findSaleById(req, res);
  
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(saleById)).to.be.equal(true);
    expect(res.json.calledWith({})).to.be.equal(false);
    expect(res.json.calledWith({ id: 1 })).to.be.equal(false);
    expect(res.json.calledWith({ itemsSold: salesData })).to.be.equal(false);
    expect(res.json.calledWith({ id: 1, itemsSold: salesData })).to.be.equal(false);
  });
  
  it('Verifica se é possível cadastrar uma nova venda', async function () {
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

  it('Deve listar todas as vendas', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([allSales]);
    await salesController.findAllSales(req, res);
    
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSales)).to.be.equal(true);
  });

  it('Deve retornar 404 se não encontrar uma venda pelo ID', async function () {
    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
    sinon.stub(salesServices, 'saleByIdService').resolves(null);
  
    await salesController.findSaleById(req, res);
  
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });

  it('Deve criar uma nova venda', async function () {
    const req = { body: salesData };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const expectedResult = { id: 1, itemsSold: salesData };
    sinon.stub(salesServices, 'createSaleService').resolves(expectedResult);

    await salesController.createSale(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(expectedResult)).to.be.equal(true);
  });

  it('Deve retornar 500 se ocorrer um erro ao criar uma venda', async function () {
    const req = { body: salesData };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves([]);

    sinon.stub(salesServices, 'createSaleService').resolves(null);

    await salesController.createSale(req, res);

    expect(res.status.calledWith(500)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Internal server error' })).to.be.equal(true);
  });
});