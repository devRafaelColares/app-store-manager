const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const validateProduct = require('../../../src/middlewares/validateProduct');

chai.use(chaiHttp);

describe('Testando validateProduct middleware', function () {
  let req;
  let res;
  let next;

  beforeEach(function () {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Verifica o erro caso haja ou não um nome', async function () {
    await validateProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Verifica o erro de acordo com a quantidade de caracteres', async function () {
    req.body.name = 'Prod';

    await validateProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Verificações', async function () {
    req.body.name = 'Product';

    await validateProduct(req, res, next);

    expect(res.status.called).to.be.equal(false);
    expect(res.json.called).to.be.equal(false);
    expect(next.calledOnce).to.be.equal(true);
  });
});
