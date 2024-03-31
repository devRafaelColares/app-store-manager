const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesServices = require('../../../src/services/sales.service');
const { allSales, saleById } = require('../../mocks/sales.mocks');

describe('Testando Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verifica se retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesServices.allSalesService();
    expect(result).to.be.deep.equal(allSales);
  });

  it('Verifica se retorna por id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await salesServices.saleByIdService('1');
    expect(result).to.be.deep.equal(saleById);
  });

  it('Verifica se retorna undefined quando o parâmetro body não existe', async function () {
    sinon.stub(salesServices, 'createSaleService');

    const result = await salesServices.createSaleService();

    expect(result).to.be.equal(undefined);
  });
});