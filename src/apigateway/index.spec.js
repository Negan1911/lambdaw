const R = require('.')
const { expect } = require('chai')

describe('API Gateway Helpers', () => {
  describe('Constructor', () => {
    it('Should create a response with 200 and no body by default', () => {
      const res = new R()
      expect(res).to.have.property('statusCode', 200)
    })

    it('Should allow me to add a body and custom status', () => {
      const res = new R(201, { test: 'OK' })
      expect(res).to.have.property('statusCode', 201)
      expect(res).to.have.property('body')
      expect(res.body).to.have.a.property('test', 'OK')
    })

    it('Should allow me to add a custom status', () => {
      const res = new R().Status(404)
      expect(res).to.have.property('statusCode', 404)
    })

    it('Should allow me to add a custom header', () => {
      const res = new R().WithHeader('hello', 'world')
      expect(res.headers).to.have.property('hello', 'world')
    })

    it('Should allow me to CORS default Support', () => {
      const res = new R().WithCORS()
      expect(res.headers).to.have.property('Access-Control-Allow-Origin', '*')
    })

    it('Should allow me to CORS custom Support', () => {
      const res = new R().WithCORS('localhost')
      expect(res.headers).to.have.property(
        'Access-Control-Allow-Origin',
        'localhost'
      )
    })

    it('Should allow me to add a body', () => {
      const res = new R().WithBody('test')
      expect(res).to.have.property('body', 'test')
    })

    it('.toJSON and Json parsers should output the same', () => {
      const res = new R(200)
        .WithCORS()
        .WithHeader('powered-by', 'SomeLoveOnServerless')
        .WithBody({ message: 'allOK' })

      expect(res).to.have.property('statusCode', 200)
      expect(res.headers).to.have.property('powered-by', 'SomeLoveOnServerless')
      expect(res.body).to.have.property('message', 'allOK')
      expect(res.toJSON()).to.deep.eq(JSON.parse(JSON.stringify(res)))
    })
  })
})
