import { baseUrl } from './setup'
import axios from 'axios'

export function getEmployee () {
  return axios.get(`${baseUrl}/employee`)
}

export function createEmployee ({ picture, email, password, name, position, salary, status, role }) {
  return axios.post(`${baseUrl}/employee`, { picture, email, password, name, position, salary, status, role })
}

export function updateEmployee (id, { picture, email, password, name, position, salary, status, role }) {
  return axios.post(`${baseUrl}/employee/${id}`, { picture, email, password, name, position, salary, status, role })
}

export function deleteEmployee (id) {
  return axios.delete(`${baseUrl}/employee/${id}`)
}
