process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist');
let should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /POST route
     */
    describe('/POST login', () => {
		it('Register', (done) => {
            let params = {
                email: `khanhqd${Math.floor(Math.random() * 200000)}@gmail.com`,
                password: "123456",
            };
            chai.request(server)
                .post('/login')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('email').eql(params.email);
                    res.body.data.should.have.property('token');
                    done();
                });
        });
        it('Login with correct password', (done) => {
            let params = {
                email: "khanhqd@gmail.com",
                password: "123456",
            };
            chai.request(server)
                .post('/login')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('email').eql(params.email);
                    res.body.data.should.have.property('token');
                    done();
                });
        });
		it('Login with wrong password', (done) => {
            let params = {
                email: "khanhqd@gmail.com",
                password: "1234567",
            };
            chai.request(server)
                .post('/login')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('exception_code').eql(101);
                    done();
                });
        });
    });

});
