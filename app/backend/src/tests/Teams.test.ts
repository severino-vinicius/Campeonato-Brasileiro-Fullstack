import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { teamsAllMock, teamMock } from './mocks/Teams.mocks';

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
    expect(body).to.deep.equal([
      {
        id: 1,
        teamName: 'Avaí/Kindermann'
      },
      {
        id: 2,
        teamName: 'Bahia'
      },
      {
        id: 3,
        teamName: 'Botafogo'
      }
    ])
  });

  it('Endpoint /teams/:id não retorna o time do Id informado', async function() {
    sinon.stub(TeamsModelSequelize, 'findByPk').resolves(null as any)
    
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
  })

  it('Endpoint /teams/:id retorna o time do Id informado', async function() {
    sinon.stub(TeamsModelSequelize, 'findByPk').resolves(teamMock as any)
    
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(
      {
        id: 1,
        teamName: 'Avaí/Kindermann'
      },
    )
  })

});
