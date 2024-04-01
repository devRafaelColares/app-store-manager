const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { 
  validateProductId,
  validateIfQuantityExist,
  validateIfQuantityMoreThanZero,
  validateProductIdExists,
} = require('../../../src/middlewares/sales.middlewares');

chai.use(chaiHttp);

describe('Testando os middlewares de sales.middlewares', function () {
  afterEach(sinon.restore);

  it('Verifica se o middleware validateProductId retorna o status 400', async function () {
    const req = { body: [] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductId(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Verifica se o middleware validateIfQuantityExist retorna o status 400', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateIfQuantityExist(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Verifica se o middleware validateIfQuantityMoreThanZero retorna o status 422', async function () {
    const req = { body: [{ productId: 1, quantity: -1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateIfQuantityMoreThanZero(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Verifica se o middleware validateProductIdExists retorna o status 404', async function () {
    const req = { body: [
      {
        productId: 9999,
        quantity: 1,
      },
    ] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductIdExists(req, res, next);

    expect(res.status.calledWith(404)).to.be.equal(false);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(false);
    expect(next.called).to.be.equal(false);
  });
});
