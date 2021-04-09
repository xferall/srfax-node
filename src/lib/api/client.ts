import axios, { AxiosInstance } from 'axios';

/**
 * Gets an axios client that is preconfigured to
 * use the SRFax API URL.
 * @returns {AxiosInstance}
 */
export function getClient(): AxiosInstance {
  return axios.create({
    baseURL: 'https://www.srfax.com/SRF_SecWebSvc.php',
  });
}
