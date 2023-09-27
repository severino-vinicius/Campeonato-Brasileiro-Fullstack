import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { teamsAllMock } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Teams', function() {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Endpoint /teams retorna todos os times corretamente', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsAllMock as any)

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
  });

  // it('Endpoint /teams retorna todos os times corretamente', async function() {
  // });
});
