import { baseUrl } from './setup'
import axios from 'axios'

export function getCard (boardId) {
  return axios.get(`${baseUrl}/card`, {
    params: { boardId }
  })
}

export function createCard ({ title, description, point, status, boardId }) {
  return axios.post(`${baseUrl}/card`, { title, description, point, status, boardId })
}

export function updateCard (id, { title, description, point }) {
  return axios.put(`${baseUrl}/card/${id}`, { title, description, point })
}

export function updateStatusCard (id, status) {
  return axios.put(`${baseUrl}/card/${id}/status`, { status })
}

export function deleteCard (id) {
  return axios.delete(`${baseUrl}/card/${id}`)
}

export function assignCard (id, user) {
  return axios.put(`${baseUrl}/card/${id}/assign`, { user })
}