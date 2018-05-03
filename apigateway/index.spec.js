const R = require('.')

describe('API Gateway Helpers', () => {
  describe('Constructor', () => {
    it('Should create a response with 200 and no body by default', () => {
      const res = new R()
      expect(res).toHaveProperty('statusCode', 200)
    })

    it('Should allow me to add a body and custom status', () => {
      const res = new R(201, { test: 'OK' })
      expect(res).toHaveProperty('statusCode', 201)
      expect(res).toHaveProperty('body')
      expect(res.body).toHaveProperty('test', 'OK')
    })

    it('Should allow me to add a custom status', () => {
      const res = new R().Status(404)
      expect(res).toHaveProperty('statusCode', 404)
    })

    it('Should allow me to add a custom header', () => {
      const res = new R().WithHeader('hello', 'world')
      expect(res.headers).toHaveProperty('hello', 'world')
    })

    it('Should allow me to CORS default Support', () => {
      const res = new R().WithCORS()
      expect(res.headers).toHaveProperty('Access-Control-Allow-Origin', '*')
    })

    it('Should allow me to CORS custom Support', () => {
      const res = new R().WithCORS('localhost')
      expect(res.headers).toHaveProperty(
        'Access-Control-Allow-Origin',
        'localhost'
      )
    })

    it('Should allow me to add a body', () => {
      const res = new R().WithBody('test')
      expect(res).toHaveProperty('body', 'test')
    })

    it('.toJSON and Json parsers should output the same', () => {
      const res = new R(200)
        .WithCORS()
        .WithHeader('powered-by', 'SomeLoveOnServerless')
        .WithBody({ message: 'allOK' })

      expect(res).toHaveProperty('statusCode', 200)
      expect(res.headers).toHaveProperty('powered-by', 'SomeLoveOnServerless')
      expect(res.body).toHaveProperty('message', 'allOK')
      expect(res.toJSON()).toEqual(JSON.parse(JSON.stringify(res)))
    })
  })
})
