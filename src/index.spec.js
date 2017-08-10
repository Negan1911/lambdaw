const lambdaw = require('../')
const { expect } = require('chai')

describe('Entry Point Test', () => {
  it('Should have an Api Gateway Object', () => {
    expect(lambdaw).to.have.property('ApiGateway')
  })

  it('Should have an Lex Object', () => {
    expect(lambdaw).to.have.property('Lex')
  })
})
