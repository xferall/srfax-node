import { QueueFaxResponse } from './types';
import { getClient } from './client';

/**
 * Submits a fax to the SRFax QUEUE_FAX API
 * @param {any} params The raw parameters for enqueueing a fax.
 *                     These should be a combination of {QueueFaxParams} and
 *                     any pairs of file names and contents.
 * @returns {Promise<QueueFaxResponse>}
 */
export async function queueFax(params: any): Promise<QueueFaxResponse> {
  const client = getClient();
  const { data } = await client.post<QueueFaxResponse>('', params);
  return data;
}
