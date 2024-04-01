const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');

chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

describe('Testando as rotas de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se retornar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
    const response = await chai.request(app).get('/products');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal([{ id: 1, name: 'Martelo de Thor' }]);
  });

  it('Verifica se retornar um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
    const response = await chai.request(app).get('/products/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });
});
