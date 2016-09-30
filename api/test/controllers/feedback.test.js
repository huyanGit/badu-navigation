const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../index');

describe('Test controllers/feedback.js', () => {
  before(done => {
    helper.clear('feedbacks', done);
  });
  const feedback = {
    content: 'Test'
  };
  describe('POST /feedbacks createFeedback()', () => {
    it('get error if there is no content in request', done => {
      request(app)
        .post('/feedbacks')
        .send({content: ''})
        .expect(400)
        .end(done);
    })
    it('create successfully', done => {
      request(app)
        .post('/feedbacks')
        .send(feedback)
        .expect(201)
        .expect(res => {
          expect(res.body.content).to.equal(feedback.content);
          expect(res.body.created_at).to.be.not.null;
        })
        .end(done);
    })
  });
  describe('GET /feedbacks getAllFeedbacks()', () => {
    it('get the created feedbacks', done => {
      request(app)
        .get('/feedbacks')
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].content).to.equal(feedback.content);
        })
        .end(done);
    })
  });
  after(done => {
    helper.clear('feedbacks', done);
  })
})
