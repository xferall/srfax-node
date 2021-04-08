export interface QueueFaxParams {
  action: 'Queue_Fax';
  access_id: number;
  access_pwd: string;
  sCallerID: number;
  sSenderEmail: string;
  sFaxType: 'SINGLE' | 'BROADCAST';
  sToFaxNumber: string;
  sResponseFormat?: 'JSON' | 'XML';
  sAccountCode?: string;
  sRetries?: number;
  sCoverPage?: string;
  sFaxFromHeader?: string;
  sCPFromName?: string;
  sCPToName?: string;
  sCPOrganization?: string;
  sCPSubject?: string;
  sCPComments?: string;
  sFileName_1?: string;
  sFileContent_1?: string;
  sNotifyURL?: string;
  sQueueFaxDate?: string;
  sQueueFaxTime?: string;
}

export interface QueueFaxResponse {
  Status: 'Success' | 'Failed';
  Result: string;
}
