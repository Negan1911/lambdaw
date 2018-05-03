const lambdaw = require('.')

describe('Entry Point Test', () => {
  it('Should have an Api Gateway Object', () => {
    expect(lambdaw).toHaveProperty('ApiGateway')
  })

  it('Should have an Lex Object', () => {
    expect(lambdaw).toHaveProperty('Lex')
  })
})
