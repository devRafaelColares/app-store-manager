const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');
const { allSales, saleById, salesData } = require('../../mocks/sales.mocks');

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

  it('Verifica se retorna null quando o id não é um número', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(null);

    const result = await salesServices.saleByIdService('abc');

    expect(result).to.be.equal(null);
  });

  it('Verifica se é possivel cadastrar vendas', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.createSale(salesData);

    const expectedResult = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };

    expect(result).to.be.deep.equal(expectedResult);
  });
});