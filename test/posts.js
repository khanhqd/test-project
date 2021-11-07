process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist');
let should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
	beforeEach((done) => {
		//Before each test we empty the database in your case
		done();
	});
	/*
	 * Test the /POST route
	 */
	describe('/GET list post', () => {
		it('Posts with limit', (done) => {
			chai.request(server).get('/posts')
				.query({ limit: 20, offset: 0 })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(true);
					res.body.data.should.be.an('array');
					// res.body.data.should.have.property('email').eql(params.email);
					// res.body.data.should.have.property('token');
					done();
				});
		});

		it('Posts no limit', (done) => {
			chai.request(server).get('/posts')
				.query()
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(true);
					res.body.data.should.be.an('array');
					// res.body.data.should.have.property('email').eql(params.email);
					// res.body.data.should.have.property('token');
					done();
				});
		});
	});

});
