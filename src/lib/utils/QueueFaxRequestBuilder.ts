import { QueueFaxRequest } from '../request/request';
import { QueueFaxFileContents, QueueFaxParams } from '../api';
abstract class RequestBuilder<T> {
  protected action: string;
  protected accessId: number;
  protected accessPwd: string;

  protected request?: T;

  constructor(accessId: number, accessPwd: string, action: string) {
    this.action = action;
    this.accessId = accessId;
    this.accessPwd = accessPwd;
  }

  abstract build(): T;
}

export class QueueFaxRequestBuilder extends RequestBuilder<QueueFaxRequest> {
  // Required attributes
  private callerId?: number;
  private senderEmail?: string;
  private faxType?: 'SINGLE' | 'BROADCAST';
  private toFaxNumber?: string;

  // Optional attributes
  private responseFormat?: 'JSON' | 'XML';
  private accountCode?: string;
  private retries?: number;
  private coverPage?: string;
  private faxFromHeader?: string;
  private CPFromName?: string;
  private CPToName?: string;
  private CPOrganization?: string;
  private CPComments?: string;
  private CPSubject?: string;
  private files?: QueueFaxFileContents[];
  private notifyURL?: string;
  private queueFaxDate?: string;
  private queueFaxTime?: string;

  constructor(accessId: number, accessPwd: string) {
    super(accessId, accessPwd, 'Queue_Fax');
    this.files = [];
  }

  setCallerId(callerId: number): QueueFaxRequestBuilder {
    this.callerId = callerId;
    return this;
  }

  setSenderEmail(email: string): QueueFaxRequestBuilder {
    this.senderEmail = email;
    return this;
  }

  setFaxType(type: 'single' | 'broadcast'): QueueFaxRequestBuilder {
    switch (type) {
      case 'single':
        this.faxType = 'SINGLE';
        break;
      case 'broadcast':
        this.faxType = 'BROADCAST';
        break;
    }
    return this;
  }

  setToFaxNumber(number: string): QueueFaxRequestBuilder {
    this.toFaxNumber = number;
    return this;
  }

  setResponseFormat(format: 'json' | 'xml'): QueueFaxRequestBuilder {
    switch (format) {
      case 'json':
        this.responseFormat = 'JSON';
        break;
      case 'xml':
        this.responseFormat = 'XML';
        break;
    }
    return this;
  }

  setAccountCode(accountCode: string): QueueFaxRequestBuilder {
    this.accountCode = accountCode;
    return this;
  }

  setRetries(retries: number): QueueFaxRequestBuilder {
    if (retries < 0 || retries > 6) {
      throw new Error('invalid number of retries');
    }
    this.retries = retries;
    return this;
  }

  setCoverPage(coverPage: string): QueueFaxRequestBuilder {
    this.coverPage = coverPage;
    return this;
  }

  setFaxFromHeader(from: string): QueueFaxRequestBuilder {
    if (from.length > 50) {
      throw new Error('From header too long');
    }
    this.faxFromHeader = from;
    return this;
  }

  setCoverPageFromName(fromName: string): QueueFaxRequestBuilder {
    this.CPFromName = fromName;
    return this;
  }

  setCoverPageToName(toName: string): QueueFaxRequestBuilder {
    this.CPToName = toName;
    return this;
  }

  setCoverPageSubject(subject: string): QueueFaxRequestBuilder {
    this.CPSubject = subject;
    return this;
  }

  setCoverPageOrg(org: string): QueueFaxRequestBuilder {
    this.CPOrganization = org;
    return this;
  }

  setCoverPageComments(comments: string): QueueFaxRequestBuilder {
    this.CPComments = comments;
    return this;
  }

  addFile(name: string, content: string): QueueFaxRequestBuilder {
    if (!this.files) {
      this.files = [];
    }
    this.files.push({ name, content });
    return this;
  }

  setNotifyURL(url: string): QueueFaxRequestBuilder {
    this.notifyURL = url;
    return this;
  }

  setQueueFaxDate(date: string): QueueFaxRequestBuilder {
    this.queueFaxDate = date;
    return this;
  }

  setQueueFaxTime(time: string): QueueFaxRequestBuilder {
    this.queueFaxTime = time;
    return this;
  }

  setQueueFaxDateTime(date: Date): QueueFaxRequestBuilder {
    if (date < new Date()) {
      throw new Error('Queue date must be in the future');
    }
    const month =
      date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`;
    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
    this.queueFaxDate = `${date.getFullYear()}-${month}-${day}`;

    const hours =
      date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
    const minutes =
      date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
    this.queueFaxTime = `${hours}:${minutes}`;

    return this;
  }

  build(): QueueFaxRequest {
    if (
      this.callerId === undefined ||
      !this.senderEmail ||
      !this.toFaxNumber ||
      !this.faxType
    ) {
      throw new Error('missing required attribute');
    }

    const params: QueueFaxParams = {
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
      sNotifyURL: this.notifyURL,
      sQueueFaxDate: this.queueFaxDate,
      sQueueFaxTime: this.queueFaxTime,
    };

    return new QueueFaxRequest(params, this.files);
  }
}
