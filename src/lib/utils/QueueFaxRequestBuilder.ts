import { QueueFaxRequest } from "../request/request"

abstract class RequestBuilder<T> {
  protected action: string
  protected accessId: number
  protected accessPwd: string

  protected request?: T

  constructor(accessId: number, accessPwd: string, action: string) {
    this.action = action
    this.accessId = accessId
    this.accessPwd = accessPwd
  }

  abstract build(): T
}

export class QueueFaxRequestBuilder extends RequestBuilder<QueueFaxRequest> {

  // Required attributes
  private callerId?: number
  private senderEmail?: string
  private faxType?: 'SINGLE' | 'BROADCAST'
  private toFaxNumber?: string

  // Optional attributes
  private responseFormat?: 'JSON' | 'XML'
  private accountCode?: string
  private retries?: number
  private coverPage?: string
  private faxFromHeader?: string
  private CPFromName?: string
  private CPToName?: string
  private CPOrganization?: string
  private CPComments?: string
  private CPSubject?: string
  private fileName?: string
  private fileContent?: string
  private notifyURL?: string
  private queueFaxDate?: string
  private queueFaxTime?: string

  constructor(accessId: number, accessPwd: string) {
    super(accessId, accessPwd, 'Queue_Fax')
  }

  setCallerId(callerId: number): QueueFaxRequestBuilder {
    this.callerId = callerId
    return this
  }

  setSenderEmail(email: string): QueueFaxRequestBuilder {
    this.senderEmail = email
    return this
  }

  setFaxType(type: 'single' | 'broadcast'): QueueFaxRequestBuilder {
    switch(type) {
      case 'single':
        this.faxType = 'SINGLE'
        break;
      case 'broadcast':
        this.faxType = 'BROADCAST'
        break;
    }
    return this
  }

  setToFaxNumber(number: string): QueueFaxRequestBuilder {
    this.toFaxNumber = number
    return this
  }

  setResponseFormat(format: 'json' | 'xml'): QueueFaxRequestBuilder {
    switch(format) {
      case 'json': 
        this.responseFormat = 'JSON'
        break;
      case 'xml':
        this.responseFormat = 'XML'
        break;
    }
    return this
  }

  setAccountCode(accountCode: string): QueueFaxRequestBuilder {
    this.accountCode = accountCode
    return this
  }

  setRetries(retries: number): QueueFaxRequestBuilder {
    if (retries < 0 || retries > 6) {
      throw new Error('invalid number of retries')
    }
    this.retries = retries
    return this
  }

  setCoverPage(coverPage: string): QueueFaxRequestBuilder {
    this.coverPage = coverPage
    return this
  }

  setFaxFromHeader(from: string): QueueFaxRequestBuilder {
    if (from.length > 50) {
      throw new Error('From header too long')
    }
    this.faxFromHeader = from
    return this
  }

  setCoverPageFromName(fromName: string): QueueFaxRequestBuilder {
    this.CPFromName = fromName
    return this
  }

  setCoverPageToName(toName: string): QueueFaxRequestBuilder {
    this.CPToName = toName
    return this
  }

  setCoverPageSubject(subject: string): QueueFaxRequestBuilder {
    this.CPSubject = subject
    return this
  }

  setCoverPageOrg(org: string): QueueFaxRequestBuilder {
    this.CPOrganization = org
    return this
  }

  setCoverPageComments(comments: string): QueueFaxRequestBuilder {
    this.CPComments = comments
    return this
  }

  setFileName(fileName: string): QueueFaxRequestBuilder {
    this.fileName = fileName
    return this
  }

  setFileContent(fileContent: string): QueueFaxRequestBuilder {
    // TODO add methods to ingest file streams or blobs here
    this.fileContent = fileContent
    return this
  }

  setNotifyURL(url: string): QueueFaxRequestBuilder {
    this.notifyURL = url
    return this
  }

  setQueueFaxDate(date: string): QueueFaxRequestBuilder {
    // TODO must be in format YYYY-MM-DD
    this.queueFaxDate = date
    return this
  }

  setQueueFaxTime(time: string): QueueFaxRequestBuilder {
    // TODO must be in format HH:MM and set with Date
    this.queueFaxTime = time
    return this
  }

  build(): QueueFaxRequest {

    if (this.callerId === undefined || !this.senderEmail || !this.toFaxNumber || !this.faxType) {
      throw new Error('missing required attribute')
    }

    return new QueueFaxRequest({
      action: 'Queue_Fax',
      access_id: this.accessId,
      access_pwd: this.accessPwd,
      sCallerID: this.callerId,
      sSenderEmail: this.senderEmail,
      sToFaxNumber: this.toFaxNumber,
      sFaxType: this.faxType,
      sResponseFormat: this.responseFormat,
      sAccountCode: this.accountCode,
      sRetries: this.retries,
      sCoverPage: this.coverPage,
      sFaxFromHeader: this.faxFromHeader,
      sCPFromName: this.CPFromName,
      sCPToName: this.CPToName,
      sCPOrganization: this.CPOrganization,
      sCPSubject: this.CPSubject,
      sCPComments: this.CPComments,
      sFileName_1: this.fileName,
      sFileContent_1: this.fileContent,
      sNotifyURL: this.notifyURL,
      sQueueFaxDate: this.queueFaxDate,
      sQueueFaxTime: this.queueFaxTime
    })
  }
}