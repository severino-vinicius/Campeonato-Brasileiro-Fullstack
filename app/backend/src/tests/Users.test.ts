import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import UsersModelSequelize from '../database/models/UsersModelSequelize'
import { validAdminUser } from './mocks/User.mocks';
import TokenValidation from '../middlewares/ValidationToken';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Login', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Metodo POST: retorna mensagem de erro ao faltar email ou senha', async function() {
    const loginData = { "email": "admin@admin.com",  };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(400);
  });

  it('Metodo POST: retorna mensagem de erro caso email ou senha não exista no banco', async function() {
    const loginData = { "email": "admin@admin.com", "password": "secret_adminnn" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(401);
  });

  it('Metodo POST: retorna mensagem de erro caso email seja invalido', async function() {
    const loginData = { "email": "@admin.com", "password": "secret_adminnn" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(401);
  });

  it('Metodo POST: retorna mensagem de erro caso senha seja invalida', async function() {
    const loginData = { "email": "admin@admin.com", "password": "secre" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(401);
  });

  it('Metodo POST: retorna mensagem de erro caso email ou senha estejam errados', async function() {
    const loginData = { "email": "dasdada@admin.com", "password": "secret_admin" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(null as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(401);
  });

  it('Metodo POST: retorna o Token caso email e senha estejam corretos', async function() {
    const loginData = { "email": "admin@admin.com", "password": "secret_admin" };
    sinon.stub(UsersModelSequelize, 'findOne').resolves(validAdminUser as any)
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  

});

describe('Testes da Rota login/role', function() {

  afterEach( function(){
    sinon.restore()
  })

  it('Metodo get: retorna o Role caso o token esteja correto', async function() {
    const tokenValid = { id: 2, role: 'user', iat: 1696190082, exp: 1697054082 }
    sinon.stub(jwt, 'verify').callsFake(() => tokenValid)

    const validatedToken = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MjczOTczLCJleHAiOjE2OTY4Nzg3NzN9.MYAZonXCSs6z4adGJMNmlKgyMyjxspCVXVSFfnWnm9I');
    
    expect(validatedToken.status).to.be.equal(200);
  });

  it('Metodo get: retorna erro caso o token esteja incorreto', async function() {
    sinon.stub(jwt, 'verify').throws()

    const validatedToken = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', 'bearer tokenFalse');
    
    expect(validatedToken.status).to.be.equal(401);
  });

  it('Metodo get: retorna erro caso não exista token', async function() {
    const validatedToken = await chai
    .request(app)
    .get('/login/role')
    
    expect(validatedToken.status).to.be.equal(401);
  });

  
})
