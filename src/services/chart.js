import { baseUrl } from './setup'
import axios from 'axios'

export function getChart () {
  return axios.get(`${baseUrl}/chart`)
}