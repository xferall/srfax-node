import { queueFax } from '../api';
import {
  QueueFaxFileContents,
  QueueFaxParams,
  QueueFaxResponse,
} from '../api/types';

abstract class SRFaxRequest<T> {
  abstract submit(): Promise<T>;
}

export class QueueFaxRequest extends SRFaxRequest<QueueFaxResponse> {
  private params: QueueFaxParams;
  private files: QueueFaxFileContents[];

  constructor(params: QueueFaxParams, files?: QueueFaxFileContents[]) {
    super();
    this.params = params;
    this.files = files || [];
  }

  async submit(): Promise<QueueFaxResponse> {
    const fileParams: any = {};
    if (this.files && this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        fileParams[`sFileName_${i}`] = this.files[i].name;
        fileParams[`sFileContent_${i}`] = this.files[i].content;
      }
    }

    return queueFax({ ...this.params, ...fileParams });
  }
}
