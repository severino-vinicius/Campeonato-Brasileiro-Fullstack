import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import UsersModelSequelize from '../database/models/UsersModelSequelize'
import { userTokenMock } from './mocks/User.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Login', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Endpoint /login retorna todos os times corretamente', async function() {
    sinon.stub(UsersModelSequelize, 'findAll').resolves(userTokenMock as any)

    const { status, body } = await chai.request(app).get('/login');

    expect(status).to.equal(200);
  });

});
