const LexResponse = require('.')
const GenericAttachments = require('./genericAttachments')

describe('Lex Helpers', () => {
  const eventFactory = () => ({
    currentIntent: { slots: { test: 'test' }, name: 'test' }
  })

  describe('Attachments', () => {
    it('Should be able to get the attachments within the main class', () => {
      expect(LexResponse.Attachments).toEqual(GenericAttachments)
    })
  })

  describe('Constructor', () => {
    it('Should get info from the event', () => {
      const e = {
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)

      expect(_req).toHaveProperty('slots', e.currentIntent.slots)
      expect(_req).toHaveProperty('intentName', e.currentIntent.name)
    })

    it('Should default sessionAttributes to an object', () => {
      const e = {
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)
      expect(_req).toHaveProperty('sessionAttributes')
      expect(Object.keys(_req.sessionAttributes).length).toBe(0)
    })

    it('Should take sessionAttributes from the event', () => {
      const e = {
        sessionAttributes: { test: 'test' },
        currentIntent: { slots: { fake: 'fake' }, name: 'test1' }
      }
      const _req = new LexResponse(e)
      expect(_req).toHaveProperty('sessionAttributes')
      expect(_req.sessionAttributes).toHaveProperty('test', 'test')
    })
  })

  describe('As Close', () => {
    it('Should mark as close with failed state', () => {
      const res = new LexResponse(eventFactory()).asClose(
        LexResponse.FULFILMENT_STATES.Failed
      )

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'Close')
      expect(res.dialogAction).toHaveProperty(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Failed
      )
    })

    it('Should mark as close with fulfilled state', () => {
      const res = new LexResponse(eventFactory()).asClose(
        LexResponse.FULFILMENT_STATES.Fulfilled
      )

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'Close')
      expect(res.dialogAction).toHaveProperty(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should mark as close with fulfilled as default', () => {
      const res = new LexResponse(eventFactory()).asClose()

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'Close')
      expect(res.dialogAction).toHaveProperty(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should have the correct type on the final response', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).toHaveProperty('type', 'Close')
      expect(res.dialogAction).toHaveProperty(
        'fulfillmentState',
        LexResponse.FULFILMENT_STATES.Fulfilled
      )
    })

    it('Should NOT have the intent name', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).not.toHaveProperty('intentName')
    })

    it('Should NOT have slots', () => {
      const res = new LexResponse(eventFactory())
        .asClose(LexResponse.FULFILMENT_STATES.Fulfilled)
        .end()

      expect(res.dialogAction).not.toHaveProperty('slots')
    })
  })

  describe('As Confirm Intent', () => {
    it('Should mark it as confirm', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent()

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'ConfirmIntent')
    })

    it('Should have slots', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent().end()

      expect(res.dialogAction).toHaveProperty('slots')
    })

    it('Should have the intent name', () => {
      const res = new LexResponse(eventFactory()).asConfirmIntent().end()

      expect(res.dialogAction).toHaveProperty('intentName')
    })
  })

  describe('As Delegate', () => {
    it('Should mark it as delegate', () => {
      const res = new LexResponse(eventFactory()).asDelegate()

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'Delegate')
    })

    it('Should NOT include the intent Name', () => {
      const res = new LexResponse(eventFactory()).asDelegate().end()

      expect(res.dialogAction).not.toHaveProperty('intentName')
    })

    it('Should include slots', () => {
      const res = new LexResponse(eventFactory()).asDelegate().end()

      expect(res.dialogAction).toHaveProperty('slots')
    })
  })

  describe('As Elicit Intent', () => {
    it('Should mark it as Elicit Intent', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent()

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'ElicitIntent')
    })

    it('Should NOT have the Intent Name', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent().end()

      expect(res.dialogAction).not.toHaveProperty('intentName')
    })

    it('Should NOT have slots', () => {
      const res = new LexResponse(eventFactory()).asElicitIntent().end()

      expect(res.dialogAction).not.toHaveProperty('slots')
    })
  })

  describe('As Elicit Slot', () => {
    it('Should mark as elicit slot with the correct slot name', () => {
      const _slotName = 't3st'
      const res = new LexResponse(eventFactory()).asElicitSlot(_slotName)

      expect(res).toHaveProperty('dialogAction')
      expect(res.dialogAction).toHaveProperty('type', 'ElicitSlot')
      expect(res.dialogAction).toHaveProperty('slotToElicit', _slotName)
    })

    it('Should include the intent name', () => {
      const res = new LexResponse(eventFactory()).asElicitSlot('t3st').end()

      expect(res.dialogAction).toHaveProperty('intentName')
    })

    it('Should have slots', () => {
      const res = new LexResponse(eventFactory()).asElicitSlot('t3st').end()

      expect(res.dialogAction).toHaveProperty('slots')
    })
  })

  describe('Slot adding', () => {
    it('Should take the slots from the current event', () => {
      const res = new LexResponse(eventFactory())

      expect(res).toHaveProperty('slots')
      expect(res.slots).toHaveProperty('test', 'test')
    })

    it('Should add a new slot', () => {
      const res = new LexResponse(eventFactory()).withSlot('test2', 'test2')

      expect(res).toHaveProperty('slots')
      expect(res.slots).toHaveProperty('test', 'test')
      expect(res.slots).toHaveProperty('test2', 'test2')
    })

    it('Should override a slot', () => {
      const res = new LexResponse(eventFactory())
        .withSlot('test2', 'test2')
        .withSlot('test2', 'test2override')

      expect(res).toHaveProperty('slots')
      expect(res.slots).toHaveProperty('test', 'test')
      expect(res.slots).toHaveProperty('test2', 'test2override')
    })
  })

  describe('Message', () => {
    it('Should add a message of text', () => {
      const res = new LexResponse(eventFactory()).withMessage(
        LexResponse.MSG_CONTENT_TYPES.PlainText,
        'Hello!'
      )

      expect(res).toHaveProperty('message')
      expect(res.message).toHaveProperty(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.message).toHaveProperty('content', 'Hello!')
    })

    it('Should add a message of text with text by default', () => {
      const res = new LexResponse(eventFactory()).withMessage(
        undefined,
        'Hello!'
      )

      expect(res).toHaveProperty('message')
      expect(res.message).toHaveProperty(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.message).toHaveProperty('content', 'Hello!')
    })

    it('Should be on the final json', () => {
      const res = new LexResponse(eventFactory())
        .withMessage(LexResponse.MSG_CONTENT_TYPES.PlainText, 'Hello!')
        .end()

      expect(res.dialogAction).toHaveProperty('message')
      expect(res.dialogAction.message).toHaveProperty(
        'contentType',
        LexResponse.MSG_CONTENT_TYPES.PlainText
      )
      expect(res.dialogAction.message).toHaveProperty('content', 'Hello!')
    })
  })

  describe('ResponseCard', () => {
    it('Should add a Response Card', () => {
      const e = new LexResponse(eventFactory()).withResponseCard()
      expect(e).toHaveProperty('responseCard')
      expect(e.responseCard).toHaveProperty('version', 1)
      expect(e.responseCard).toHaveProperty('genericAttachments')
      expect(e.responseCard.genericAttachments).toHaveLength(0)
      expect(e.responseCard).toHaveProperty(
        'contentType',
        'application/vnd.amazonaws.card.generic'
      )
    })

    it('Should output the Response Card', () => {
      const e = new LexResponse(eventFactory()).withResponseCard().end()
      expect(e.dialogAction).toHaveProperty('responseCard')
      expect(e.dialogAction.responseCard).toHaveProperty('version', 1)
      expect(e.dialogAction.responseCard).toHaveProperty('genericAttachments')
      expect(e.dialogAction.responseCard.genericAttachments).toHaveLength(0)
      expect(e.dialogAction.responseCard).toHaveProperty(
        'contentType',
        'application/vnd.amazonaws.card.generic'
      )
    })

    it('Should parse a GenericAttachment', () => {
      const attachment = new GenericAttachments('test')
      const e = new LexResponse(eventFactory()).withResponseCard(1, [
        attachment
      ])

      expect(e.responseCard.genericAttachments).toHaveLength(1)
      expect(e.responseCard.genericAttachments[0]).toHaveProperty(
        'title',
        'test'
      )
    })

    it('Should parse a GenericAttachment output', () => {
      const attachment = new GenericAttachments('test').end()
      const e = new LexResponse(eventFactory()).withResponseCard(1, [
        attachment
      ])

      expect(e.responseCard.genericAttachments).toHaveLength(1)
      expect(e.responseCard.genericAttachments[0]).toHaveProperty(
        'title',
        'test'
      )
    })
  })
})
