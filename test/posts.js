process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist');
let should = chai.should();

chai.use(chaiHttp);

const TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtoYW5ocWRAYWdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6MTYzNjI5NzUzNTM1NX0.uf5JJN-okwFepQ3WOHWEkgrjhKuO4d6I82T_SsmG9N4';

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
					done();
				});
		});
	});

	describe('/POST create post', () => {
		it('Without authen', (done) => {
			let params = {
				url: 'https://www.youtube.com/watch?v=SlPhMPnQ58k',
			}
			chai.request(server).post('/posts/create')
				.send(params)
				.end((err, res) => {
					res.should.have.status(500);
					done();
				});
		});
		it('With invalid url', (done) => {
			let params = {
				url: 'htp21399.com',
			}
			chai.request(server).post('/posts/create').set('authorization', TEST_TOKEN)
				.send(params)
				.end((err, res) => {
					res.should.have.status(500);
					done();
				});
		});
		it('With not supported url', (done) => {
			let params = {
				url: 'https://google.com',
			}
			chai.request(server).post('/posts/create').set('authorization', TEST_TOKEN)
				.send(params)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(false);
					res.body.should.have.property('exception_code').eql(202);
					done();
				});
		});
		it('With correct url', (done) => {
			let params = {
				url: 'https://www.youtube.com/watch?v=SlPhMPnQ58k',
			}
			chai.request(server).post('/posts/create').set('authorization', TEST_TOKEN)
				.send(params)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	})
});
