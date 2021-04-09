import { QueueFaxParams, QueueFaxResponse } from './types';
import { getClient } from './client';

/**
 * Submits a fax to the SRFax QUEUE_FAX API
 * @param {QueueFaxParams} params The raw parameters for enqueueing a fax
 * @returns {Promise<QueueFaxResponse>}
 */
export async function queueFax(
  params: QueueFaxParams
): Promise<QueueFaxResponse> {
  const client = getClient();
  const { data } = await client.post<QueueFaxResponse>('', params);
  return data;
}
