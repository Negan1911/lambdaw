const GenericAttachment = require('./genericAttachments')

describe('Generic Attachment Lex', () => {
  it('Should have a title', () => {
    const attachment = new GenericAttachment('test')
    expect(attachment).toHaveProperty('title', 'test')
  })

  it('Should have a subtitle', () => {
    const attachment = new GenericAttachment('test').withSubTitle('subtitle')
    expect(attachment).toHaveProperty('subTitle', 'subtitle')
  })

  it('Should have a imageUrl', () => {
    const url = 'http://url/'
    const attachment = new GenericAttachment('test').withImageUrl(url)
    expect(attachment).toHaveProperty('imageUrl', url)
  })

  it('Should have a attachmentLinkUrl', () => {
    const url = 'http://url/'
    const attachment = new GenericAttachment('test').withAttachmentLinkUrl(url)
    expect(attachment).toHaveProperty('attachmentLinkUrl', url)
  })

  it('Should add buttons', () => {
    const attachment = new GenericAttachment('test')
      .withButton('test1title', 'test1value')
      .withButton('test2title', 'test2value')

    expect(attachment.buttons).toHaveLength(2)
    expect(attachment.buttons[0]).toHaveProperty('text', 'test1title')
    expect(attachment.buttons[0]).toHaveProperty('value', 'test1value')
    expect(attachment.buttons[1]).toHaveProperty('text', 'test2title')
    expect(attachment.buttons[1]).toHaveProperty('value', 'test2value')
  })

  it('Should return everything', () => {
    const attachment = new GenericAttachment('title')
      .withSubTitle('subtitle')
      .withButton('button1title', 'button1value')
      .withButton('button2title', 'button2value')
      .withImageUrl('http://image-url')
      .withAttachmentLinkUrl('http://att-url')
      .end()

    expect(attachment).toHaveProperty('title', 'title')
    expect(attachment).toHaveProperty('subTitle', 'subtitle')
    expect(attachment).toHaveProperty('imageUrl', 'http://image-url')
    expect(attachment).toHaveProperty('attachmentLinkUrl', 'http://att-url')
    expect(attachment).toHaveProperty('buttons')
    expect(attachment.buttons).toHaveLength(2)
    expect(attachment.buttons[0]).toHaveProperty('text', 'button1title')
    expect(attachment.buttons[0]).toHaveProperty('value', 'button1value')
    expect(attachment.buttons[1]).toHaveProperty('text', 'button2title')
    expect(attachment.buttons[1]).toHaveProperty('value', 'button2value')
  })
})
