import { QueueFaxParams, QueueFaxResponse } from './types';
import { getClient } from './client';

export async function queueFax(
  params: QueueFaxParams
): Promise<QueueFaxResponse> {
  const client = getClient();
  const { data } = await client.post<QueueFaxResponse>('', params);
  return data;
}
