module.exports = class GenericAttachment {
  /**
   * Add a Attachment for the Response Card
   * @param {String} title - Title of the Attachment
   */
  constructor(title) {
    this.buttons = []
    this.title = title
  }

  /**
   * Add a Subtitle
   * @param {String} subTitle - Subtitle
   */
  withSubTitle(subTitle) {
    this.subTitle = subTitle

    return this
  }

  /**
   * Add a Image URL
   * @param {String} imageUrl - Image URL
   */
  withImageUrl(imageUrl) {
    this.imageUrl = imageUrl

    return this
  }

  /**
   * Add an Attachment Link URL
   * @param {String} attachmentLinkUrl - Attachment Link URL
   */
  withAttachmentLinkUrl(attachmentLinkUrl) {
    this.attachmentLinkUrl = attachmentLinkUrl

    return this
  }

  /**
   * Add a button to the attachment
   * @param {String} text - Text to show to the user
   * @param {*} value - Value sent to server on button click
   */
  withButton(text, value) {
    this.buttons.push({ text, value })

    return this
  }

  end() {
    return {
      title: this.title,
      subTitle: this.subTitle,
      imageUrl: this.imageUrl,
      attachmentLinkUrl: this.attachmentLinkUrl,
      buttons: this.buttons
    }
  }
}
