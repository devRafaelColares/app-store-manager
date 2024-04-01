const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { validateProduct, validateProductExists } = require('../../../src/middlewares/products.middlewares');
let checkIfProductExists = require('../../../src/utils/checkIfProductExists');

chai.use(chaiHttp);

describe('Testando os middlewares de products.middlewares ', function () {
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

  it('Verifica se o middleware validateProductExists retorna o status 404', async function () {
    req = { params: { id: 123 } };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.spy();
  
    const checkIfProductExistsStub = sinon.stub().resolves(false);
    const originalCheckIfProductExists = checkIfProductExists;
    checkIfProductExists = checkIfProductExistsStub;
  
    await validateProductExists(req, res, next);
  
    checkIfProductExists = originalCheckIfProductExists;
  
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });
});
