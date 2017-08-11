const GenericAttachments = require('./genericAttachments')

module.exports = class Response {
  /**
   * Get the attachment class for creating response cards
   * @returns {GenericAttachments} Attachment Class
   */
  static get Attachments() {
    return GenericAttachments
  }

  /**
   * Message Content Types
   */
  static get MSG_CONTENT_TYPES() {
    return {
      PlainText: 'PlainText',
      SSML: 'SSML'
    }
  }

  /**
   * Close fulfilment states
   */
  static get FULFILMENT_STATES() {
    return {
      Fulfilled: 'Fulfilled',
      Failed: 'Failed'
    }
  }

  /**
   * Construct a Response
   * @param {Object} e - Input event, used to feed some required state
   */
  constructor(e) {
    this.dialogAction = {}
    this.slots = e.currentIntent.slots
    this.intentName = e.currentIntent.name

    this.sessionAttributes = e.sessionAttributes || {}
  }

  /**
   * Informs Amazon Lex not to expect a response from the user
   * @param {FULLFILMENT_STATES} fulfillmentState - Fulfilled or Failed
   */
  asClose(fulfillmentState = Response.FULFILMENT_STATES.Fulfilled) {
    this.dialogAction = {
      type: 'Close',
      fulfillmentState
    }

    return this
  }

  /**
   * Informs Amazon Lex that the user is expected to give a 
   * yes or no answer to confirm or deny the current intent
   * @returns {Response} Response Instance, for chaining with other methods
   */
  asConfirmIntent() {
    this.dialogAction = { type: 'ConfirmIntent' }

    return this
  }

  /**
   * Directs Amazon Lex to choose the next course of action 
   * based on the bot configuration
   * @returns {Response} Response Instance, for chaining with other methods
   */
  asDelegate() {
    this.dialogAction = { type: 'Delegate' }

    return this
  }

  /**
   * Informs Amazon Lex that the user is expected to 
   * respond with an utterance that includes an intent
   * @returns {Response} Response Instance, for chaining with other methods
   */
  asElicitIntent() {
    this.dialogAction = { type: 'ElicitIntent' }

    return this
  }

  /**
   * Informs Amazon Lex that the user is expected to 
   * provide a slot value in the response.
   * @param {String} slotToElicit - slot to complete
   * @returns {Response} Response Instance, for chaining with other methods
   */
  asElicitSlot(slotToElicit) {
    this.dialogAction = { type: 'ElicitSlot', slotToElicit }

    return this
  }

  /**
   * Set slot information
   * @param {String} name - Slot name
   * @param {String} value - Slot Value
   * @returns {Response} Response Instance, for chaining with other methods
   */
  withSlot(name, value) {
    this.slots[name] = value

    return this
  }

  /**
   * Respond with a custom message
   * @param {ContentType} contentType - Content type, PlainText or SSML
   * @param {String} content - Text to show to the user
   * @returns {Response} Response Instance, for chaining with other methods
   */
  withMessage(contentType = Response.MSG_CONTENT_TYPES.PlainText, content) {
    this.message = { contentType, content }

    return this
  }

  /**
   * Show a response card
   * @param {Integer} version - Version of the Response Card
   * @param {GenericAttachments|Object} genericAttachments - List of the cards to show
   * @returns {Response} Response Instance, for chaining with other methods
   */
  withResponseCard(version = 1, genericAttachments = []) {
    this.responseCard = {
      version,
      contentType: 'application/vnd.amazonaws.card.generic',
      genericAttachments: genericAttachments.map(
        item => (item.end ? item.end() : item)
      )
    }

    return this
  }

  /**
   * Convert the response to Lex format
   * @returns {Object} Lex Response
   */
  end() {
    const type = this.dialogAction.type
    const res = {
      dialogAction: this.dialogAction,
      sessionAttributes: this.sessionAttributes
    }

    if (['ConfirmIntent', 'ElicitSlot'].includes(type)) {
      res.dialogAction.intentName = this.intentName
    }

    if (['ConfirmIntent', 'Delegate', 'ElicitSlot'].includes(type)) {
      res.dialogAction.slots = this.slots
    }

    if (this.message) {
      res.dialogAction.message = this.message
    }

    if (this.responseCard) {
      res.dialogAction.responseCard = this.responseCard
    }

    return res
  }
}
