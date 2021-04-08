import axios from 'axios'

export function getClient() {
  return axios.create({
    baseURL: "https://www.srfax.com/SRF_SecWebSvc.php"
  })
}