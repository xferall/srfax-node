import { QueueFaxRequestBuilder } from '../src/index'

describe('QueueFaxRequestBuilder tests', () => {
  test('constructor', () => {
    new QueueFaxRequestBuilder(123, 'blah')
  })

  test('build fails after only constructor', () => {
    const builder = new QueueFaxRequestBuilder(123, 'blah')
    expect(() => builder.build()).toThrow('missing required attribute')
  })

  test('build fails without all required attributes', () => {
    const builder = new QueueFaxRequestBuilder(123, 'blah')
    builder.setCallerId(0)
    builder.setSenderEmail('test@test.test')
    builder.setFaxType('single')

    expect(() => builder.build()).toThrow('missing required attribute')
  })

  test('invalid retries throws', () => {
    const builder = new QueueFaxRequestBuilder(123, 'blah')
    builder
      .setCallerId(0)
      .setSenderEmail('bob@tom.net')
      .setFaxType('single')
      .setToFaxNumber('15555551234')
    
    expect(() => builder.setRetries(-1)).toThrow('invalid number of retries')
    expect(() => builder.setRetries(7)).toThrow('invalid number of retries')
  })

  test('invalid fax from header throws', () => {
    const builder = new QueueFaxRequestBuilder(123, 'blah')
    builder
      .setCallerId(0)
      .setSenderEmail('bob@tom.net')
      .setFaxType('single')
      .setToFaxNumber('15555551234')
    
    const longString = '000000000000000000000000000000000000000000000000000'
    expect(() => builder.setFaxFromHeader(longString)).toThrow('From header too long')
  })

  test('build complete fax request', () => {
    const builder = new QueueFaxRequestBuilder(123, 'blah')
    builder
      .setCallerId(0)
      .setSenderEmail('bob@tom.net')
      .setFaxType('single')
      .setToFaxNumber('15555551234')
      .setResponseFormat('json')
      .setAccountCode('0000000')
      .setRetries(2)
      .setCoverPage('personal')
      .setFaxFromHeader('whee')
      .setCoverPageFromName('bob')
      .setCoverPageToName('tom')
      .setCoverPageOrg('ACME')
      .setCoverPageSubject('Fax')
      .setCoverPageComments('Wiley')
      .setFileName('fax.pdf')
      .setFileContent(atob('Fax Data'))
      .setNotifyURL('https://localhost/callback')
      .setQueueFaxDate('2525-01-01')
      .setQueueFaxTime('23:00')

    expect(() => builder.build()).not.toThrow()
  })
})