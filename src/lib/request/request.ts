import { queueFax } from "../api";
import { QueueFaxParams, QueueFaxResponse } from "../api/types";

abstract class SRFaxRequest<T> {
  abstract submit(): Promise<T>
}

export class QueueFaxRequest extends SRFaxRequest<QueueFaxResponse> {
  private params: QueueFaxParams

  constructor(params: QueueFaxParams) {
    super()
    this.params = params
  }

  async submit(): Promise<QueueFaxResponse> {
    return queueFax(this.params)
  }
}