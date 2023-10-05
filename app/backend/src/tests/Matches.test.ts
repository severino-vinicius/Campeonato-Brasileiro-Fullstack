import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { fishedMatches, inProgressMatcheById, inProgressMatches, matchUpdatedMock, matchesMock } from './mocks/Matches.mocks';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Matches', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Metodo get: retorna todos os times corretamente', async function() {
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock as any)

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock)
  });

  it('Metodo get: retorna partidar finalizadas', async function() {
    const filteredFinishedMatches = MatchesModelSequelize.bulkBuild(fishedMatches, {
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(filteredFinishedMatches)

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.equal(200);
  })

  it('Metodo get: retorna partidar em andamento', async function() {
    const filteredFinishedMatches = MatchesModelSequelize.bulkBuild(inProgressMatches, {
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(filteredFinishedMatches)

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
  })

  it('Metodo Patch: atualiza partida para finalizada', async function() {
    const tokenValid = { id: 2, role: 'user', iat: 1696190082, exp: 1697054082 }

    sinon.stub(jwt, 'verify').callsFake(() => tokenValid)
    // sinon.stub(MatchesModelSequelize, 'findByPk').resolves(inProgressMatcheById as any)
    sinon.stub(MatchesModelSequelize, 'update').resolves([1])


    const { status, body } = await chai.request(app)
    .patch('/matches/43/finish')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MjczOTczLCJleHAiOjE2OTY4Nzg3NzN9.MYAZonXCSs6z4adGJMNmlKgyMyjxspCVXVSFfnWnm9I');;
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' })
  })

  it('Metodo Patch: retorna erro caso o id informado seja inexistente', async function() {
    const tokenValid = { id: 2, role: 'user', iat: 1696190082, exp: 1697054082 }
    const id = 99;
    sinon.stub(jwt, 'verify').callsFake(() => tokenValid)
    sinon.stub(MatchesModelSequelize, 'findByPk').resolves(null as any)
    // sinon.stub(MatchesModelSequelize, 'update').resolves([1])


    const { status, body } = await chai.request(app)
    .patch(`/matches/${id}/finish`)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MjczOTczLCJleHAiOjE2OTY4Nzg3NzN9.MYAZonXCSs6z4adGJMNmlKgyMyjxspCVXVSFfnWnm9I');;
    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: `Matche ${id} not found` })
  })

  it('Metodo Patch: retorna erro caso a partida já esteja finalizada', async function() {
    const tokenValid = { id: 2, role: 'user', iat: 1696190082, exp: 1697054082 }
    const id = 43;
    sinon.stub(jwt, 'verify').callsFake(() => tokenValid)
    sinon.stub(MatchesModelSequelize, 'update').resolves([0])


    const { status, body } = await chai.request(app)
    .patch(`/matches/${id}/finish`)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MjczOTczLCJleHAiOjE2OTY4Nzg3NzN9.MYAZonXCSs6z4adGJMNmlKgyMyjxspCVXVSFfnWnm9I');;
    expect(status).to.equal(409);
    expect(body).to.be.deep.equal({ message: `This matche ${id} is already finished!` })
  })

});
