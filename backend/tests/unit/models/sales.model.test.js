const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesModel = require('../../../src/models/sales.model');
const { allSales, saleById } = require('../../mocks/sales.mocks');

describe('Testando Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });
      
  it('Verifica se retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesModel.getAllSalesWithData();
    expect(result).to.be.deep.equal(allSales);
  });

  it('Verifica se retorna as vendas pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await salesModel.getSaleById(1);
    expect(result).to.be.deep.equal(saleById);
  });
});