const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

const baseUrl = 'http://localhost:8080';
let token;
let id;

const user = {
  name: 'teste',
  username: 'teste2',
  email: 'sou@teste.com',
  password: 'teste',
};

describe('Testando Usuario', () => {
  it('Deve criar um usuario', (done) => {
    chai
      .request(baseUrl)
      .post('/user')
      .send(user) // vamos enviar esse arquivo
      .end((err, res) => {
        id = res.body.id;
        res.should.have.status(200);
        done();
      });
  });
  it('Deve fazer login', (done) => {
    chai
      .request(baseUrl)
      .post('/login')
      .send({ email: user.email, password: user.password }) // vamos enviar esse arquivo
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Deve listar os usuarios', (done) => {
    chai
      .request(baseUrl)
      .get('/user')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('Deve deletar o usuario', (done) => {
    chai
      .request(baseUrl)
      .delete(`/userdelete/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
