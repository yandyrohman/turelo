import { baseUrl } from './setup'
import axios from 'axios'

export function getEmployee () {
  return axios.get(`${baseUrl}/employee`)
}

export function createEmployee ({ email, password, name, position, salary, status, role }) {
  return axios.post(`${baseUrl}/employee`, { email, password, name, position, salary, status, role })
}
