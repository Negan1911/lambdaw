const { expect } = require('chai')
const GenericAttachment = require('./genericAttachments')

describe('Generic Attachment Lex', () => {
  it('Should have a title', () => {
    const attachment = new GenericAttachment('test')
    expect(attachment).to.have.property('title', 'test')
  })

  it('Should have a subtitle', () => {
    const attachment = new GenericAttachment('test').withSubTitle('subtitle')
    expect(attachment).to.have.property('subTitle', 'subtitle')
  })

  it('Should have a imageUrl', () => {
    const url = 'http://url/'
    const attachment = new GenericAttachment('test').withImageUrl(url)
    expect(attachment).to.have.property('imageUrl', url)
  })

  it('Should have a attachmentLinkUrl', () => {
    const url = 'http://url/'
    const attachment = new GenericAttachment('test').withAttachmentLinkUrl(url)
    expect(attachment).to.have.property('attachmentLinkUrl', url)
  })

  it('Should add buttons', () => {
    const attachment = new GenericAttachment('test')
      .withButton('test1title', 'test1value')
      .withButton('test2title', 'test2value')

    expect(attachment.buttons).to.have.length(2)
    expect(attachment.buttons[0]).to.have.property('text', 'test1title')
    expect(attachment.buttons[0]).to.have.property('value', 'test1value')
    expect(attachment.buttons[1]).to.have.property('text', 'test2title')
    expect(attachment.buttons[1]).to.have.property('value', 'test2value')
  })

  it('Should return everything', () => {
    const attachment = new GenericAttachment('title')
      .withSubTitle('subtitle')
      .withButton('button1title', 'button1value')
      .withButton('button2title', 'button2value')
      .withImageUrl('http://image-url')
      .withAttachmentLinkUrl('http://att-url')
      .end()

    expect(attachment).to.have.property('title', 'title')
    expect(attachment).to.have.property('subTitle', 'subtitle')
    expect(attachment).to.have.property('imageUrl', 'http://image-url')
    expect(attachment).to.have.property('attachmentLinkUrl', 'http://att-url')
    expect(attachment).to.have.property('buttons')
    expect(attachment.buttons).to.have.length(2)
    expect(attachment.buttons[0]).to.have.property('text', 'button1title')
    expect(attachment.buttons[0]).to.have.property('value', 'button1value')
    expect(attachment.buttons[1]).to.have.property('text', 'button2title')
    expect(attachment.buttons[1]).to.have.property('value', 'button2value')
  })
})
