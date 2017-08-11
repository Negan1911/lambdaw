const { expect } = require('chai')
const LexResponse = require('.')
const GenericAttachments = require('./genericAttachments')

describe('Lex Helpers', () => {
  const eventFactory = () => ({
    currentIntent: { slots: { test: 'test' }, name: 'test' }
  })

  describe('Attachments', () => {
    it('Should be able to get the attachments within the main class', () => {
      expect(LexResponse.Attachments).to.be.deep.equal(GenericAttachments)
    })
  })

  describe('Constructor', () => {
    it('Should get info from the event', () => {
      const e = {
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)

      expect(_req).to.have.property('slots', e.currentIntent.slots)
      expect(_req).to.have.property('intentName', e.currentIntent.name)
    })

    it('Should default sessionAttributes to an object', () => {
      const e = {
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)
      expect(_req.sessionAttributes).to.be.an('object')
      expect(Object.keys(_req.sessionAttributes).length).to.eq(0)
    })

    it('Should take sessionAttributes from the event', () => {
      const e = {
        sessionAttributes: { test: 'test' },
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)
      expect(_req.sessionAttributes).to.be.an('object')
      expect(_req.sessionAttributes).to.have.property('test', 'test')
    })
  })

  describe('As Close', () => {
    it('Should mark as close with failed state', () => {
      const res = new LexResponse(eventFactory()).asClose(
        LexResponse.FULFILMENT_STATES.Failed
      )

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'Close')
      expect(res.dialogAction).to.have.property(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Failed
      )
    })

    it('Should mark as close with fulfilled state', () => {
      const res = new LexResponse(eventFactory()).asClose(
        LexResponse.FULFILMENT_STATES.Fulfilled
      )

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'Close')
      expect(res.dialogAction).to.have.property(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should mark as close with fulfilled as default', () => {
      const res = new LexResponse(eventFactory()).asClose()

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'Close')
      expect(res.dialogAction).to.have.property(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should have the correct type on the final response', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).to.have.property('type', 'Close')
      expect(res.dialogAction).to.have.property(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should NOT have the intent name', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).to.not.have.property('intentName')
    })

    it('Should NOT have slots', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).to.not.have.property('slots')
    })
  })

  describe('As Confirm Intent', () => {
    it('Should mark it as confirm', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent()

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'ConfirmIntent')
    })

    it('Should have slots', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent().end()

      expect(res.dialogAction).to.have.property('slots')
    })

    it('Should have the intent name', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent().end()

      expect(res.dialogAction).to.have.property('intentName')
    })
  })

  describe('As Delegate', () => {
    it('Should mark it as delegate', () => {
      const res = new LexResponse(eventFactory()).asDelegate()

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'Delegate')
    })

    it('Should NOT include the intent Name', () => {
      const res = new LexResponse(eventFactory()).asDelegate().end()

      expect(res.dialogAction).to.not.have.property('intentName')
    })

    it('Should include slots', () => {
      const res = new LexResponse(eventFactory()).asDelegate().end()

      expect(res.dialogAction).to.have.property('slots')
    })
  })

  describe('As Elicit Intent', () => {
    it('Should mark it as Elicit Intent', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent()

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'ElicitIntent')
    })

    it('Should NOT have the Intent Name', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent().end()

      expect(res.dialogAction).to.not.have.property('intentName')
    })

    it('Should NOT have slots', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent().end()

      expect(res.dialogAction).to.not.have.property('slots')
    })
  })

  describe('As Elicit Slot', () => {
    it('Should mark as elicit slot with the correct slot name', () => {
      const _slotName = 't3st'
      const res = new LexResponse(eventFactory()).asElicitSlot(_slotName)

      expect(res).to.have.property('dialogAction')
      expect(res.dialogAction).to.have.property('type', 'ElicitSlot')
      expect(res.dialogAction).to.have.property('slotToElicit', _slotName)
    })

    it('Should include the intent name', () => {
      const res = new LexResponse(eventFactory()).asElicitSlot('t3st').end()

      expect(res.dialogAction).to.have.property('intentName')
    })

    it('Should have slots', () => {
      const res = new LexResponse(eventFactory()).asElicitSlot('t3st').end()

      expect(res.dialogAction).to.have.property('slots')
    })
  })

  describe('Slot adding', () => {
    it('Should take the slots from the current event', () => {
      const res = new LexResponse(eventFactory())

      expect(res).to.have.property('slots')
      expect(res.slots).to.have.property('test', 'test')
    })

    it('Should add a new slot', () => {
      const res = new LexResponse(eventFactory()).withSlot('test2', 'test2')

      expect(res).to.have.property('slots')
      expect(res.slots).to.have.property('test', 'test')
      expect(res.slots).to.have.property('test2', 'test2')
    })

    it('Should override a slot', () => {
      const res = new LexResponse(eventFactory())
        .withSlot('test2', 'test2')
        .withSlot('test2', 'test2override')

      expect(res).to.have.property('slots')
      expect(res.slots).to.have.property('test', 'test')
      expect(res.slots).to.have.property('test2', 'test2override')
    })
  })

  describe('Message', () => {
    it('Should add a message of text', () => {
      const res = new LexResponse(eventFactory()).withMessage(
        LexResponse.MSG_CONTENT_TYPES.PlainText,
        'Hello!'
      )

      expect(res).to.have.property('message')
      expect(res.message).to.have.property(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.message).to.have.property('content', 'Hello!')
    })

    it('Should add a message of text with text by default', () => {
      const res = new LexResponse(eventFactory()).withMessage(
        undefined,
        'Hello!'
      )

      expect(res).to.have.property('message')
      expect(res.message).to.have.property(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.message).to.have.property('content', 'Hello!')
    })

    it('Should be on the final json', () => {
      const res = new LexResponse(eventFactory())
        .withMessage(LexResponse.MSG_CONTENT_TYPES.PlainText, 'Hello!')
        .end()

      expect(res.dialogAction).to.have.property('message')
      expect(res.dialogAction.message).to.have.property(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.dialogAction.message).to.have.property('content', 'Hello!')
    })
  })

  describe('ResponseCard', () => {
    it('Should add a Response Card', () => {
      const e = new LexResponse(eventFactory()).withResponseCard()
      expect(e).to.have.property('responseCard')
      expect(e.responseCard).to.have.property('version', 1)
      expect(e.responseCard).to.have.property('genericAttachments')
      expect(e.responseCard.genericAttachments).to.have.length(0)
      expect(e.responseCard).to.have.property(
        'contentType',
        'application/vnd.amazonaws.card.generic'
      )
    })

    it('Should output the Response Card', () => {
      const e = new LexResponse(eventFactory()).withResponseCard().end()
      expect(e.dialogAction).to.have.property('responseCard')
      expect(e.dialogAction.responseCard).to.have.property('version', 1)
      expect(e.dialogAction.responseCard).to.have.property('genericAttachments')
      expect(e.dialogAction.responseCard.genericAttachments).to.have.length(0)
      expect(e.dialogAction.responseCard).to.have.property(
        'contentType',
        'application/vnd.amazonaws.card.generic'
      )
    })

    it('Should parse a GenericAttachment', () => {
      const attachment = new GenericAttachments('test')
      const e = new LexResponse(eventFactory()).withResponseCard(1, [
        attachment
      ])

      expect(e.responseCard.genericAttachments).to.have.length(1)
      expect(e.responseCard.genericAttachments[0]).to.have.property(
        'title',
        'test'
      )
    })

    it('Should parse a GenericAttachment output', () => {
      const attachment = new GenericAttachments('test').end()
      const e = new LexResponse(eventFactory()).withResponseCard(1, [
        attachment
      ])

      expect(e.responseCard.genericAttachments).to.have.length(1)
      expect(e.responseCard.genericAttachments[0]).to.have.property(
        'title',
        'test'
      )
    })
  })
})
