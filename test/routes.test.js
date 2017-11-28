const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Bike Resources', function () {
  describe('POST /', function () {
    it('should create a bike', function (done) {
      const bike = { brand: 'Trek', type: 'Mountain', year: '2014', condition: 'Good' }
      chai.request(app)
        .post('/bikes')
        .send(bike)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.brand).to.equal(bike.brand)
          expect(res.body.data.type).to.equal(bike.type)
          expect(res.body.data.year).to.equal(bike.year)
          expect(res.body.data.condition).to.equal(bike.condition)
          done()
        })
    })

    it('should return an error if brand is missing', function (done) {
      const bike = { brand: 'Trek' }
      chai.request(app)
        .post('/bikes')
        .send(bike)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
    it('should return an error if type is missing', function (done) {
      const bike = { type: 'Mountain' }
      chai.request(app)
        .post('/bikes')
        .send(bike)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
    it('should return an error if year is missing', function (done) {
      const bike = { year: '2014' }
      chai.request(app)
        .post('/bikes')
        .send(bike)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
    it('should return an error if condition is missing', function (done) {
      const bike = { condition: 'Good' }
      chai.request(app)
        .post('/bikes')
        .send(bike)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the bikes', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          expect(bike).to.be.an('object')
          expect(bike.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single bike specified', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          chai.request(app)
            .get(`/bikes/${bike.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(bike.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a bike', function (done) {
      chai.request(app)
        .get('/bikes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing bike when all information is provided', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          const newInfo = { brand: 'Specialized', type: 'Road', year: '2012', condition: 'Excellent' }
          chai.request(app)
            .put(`/bikes/${bike.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.brand).to.equal(newInfo.brand)
              expect(res.body.data.type).to.equal(newInfo.type)
              expect(res.body.data.year).to.equal(newInfo.year)
              expect(res.body.data.condition).to.equal(newInfo.condition)
              done()
            })
        })

    })

    it('should return an error if brand is missing', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          const newInfo = { brand: 'Specialized' }
          chai.request(app)
            .put(`/bikes/${bike.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if type is missing', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          const newInfo = { type: 'Road' }
          chai.request(app)
            .put(`/bikes/${bike.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
    it('should return an error if year is missing', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          const newInfo = { year: '2012' }
          chai.request(app)
            .put(`/bikes/${bike.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
    it('should return an error if condition is missing', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          const newInfo = { condition: 'Excellent' }
          chai.request(app)
            .put(`/bikes/${bike.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified bike', function (done) {
      chai.request(app)
        .get('/bikes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const bike = res.body.data[0]
          chai.request(app)
            .delete(`/bikes/${bike.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/bikes/${bike.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/bikes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
