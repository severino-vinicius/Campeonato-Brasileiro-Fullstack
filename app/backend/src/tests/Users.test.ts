import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import UsersModelSequelize from '../database/models/UsersModelSequelize'
import { validAdminUser } from './mocks/User.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Login', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Endpoint /login retorna o Token caso email e senha estejam corretos', async function() {
    const loginData = { "email": "admin@admin.com", "password": "secret_admin" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(200);
  });

});
