import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { matchesMock } from './mocks/Matches.mocks';

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
    expect(body).to.deep.equal([
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
        homeTeam: {
          teamName: 'São Paulo'
        },
        awayTeam: {
          teamName: 'Grêmio'
        }
      },
      {
        id: 2,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: false,
        homeTeam: {
          teamName: 'Internacional'
        },
        awayTeam: {
          teamName: 'Santos'
        }
      },
      {
        id: 3,
        homeTeamId: 4,
        homeTeamGoals: 3,
        awayTeamId: 11,
        awayTeamGoals: 0,
        inProgress: false,
        homeTeam: {
          teamName: 'Corinthians'
        },
        awayTeam: {
          teamName: 'Napoli-SC'
        }
      },
    ])
  });

});
