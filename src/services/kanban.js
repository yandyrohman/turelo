import { baseUrl } from './setup'
import axios from 'axios'

export function getCard () {
  return axios.get(`${baseUrl}/card`)
}

export function createCard ({ title, description, point, status }) {
  return axios.post(`${baseUrl}/card`, { title, description, point, status })
}

export function updateCard (id, { title, description, point }) {
  return axios.put(`${baseUrl}/card/${id}`, { title, description, point })
}

export function updateStatusCard (id, status) {
  return axios.put(`${baseUrl}/card/${id}/status`, { status })
}