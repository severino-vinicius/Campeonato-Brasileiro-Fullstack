import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { teamsAllMock } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Teams', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Endpoint /teams retorna todos os times corretamente', async function() {
    sinon.stub(TeamsModelSequelize, 'findAll').resolves(teamsAllMock as any)

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
  });

});
