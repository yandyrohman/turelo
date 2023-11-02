import { baseUrl } from './setup'
import axios from 'axios'

export function getBoard () {
  return axios.get(`${baseUrl}/board`)
}

export function getBoardDetail (boardId) {
  return axios.get(`${baseUrl}/board/${boardId}`)
}

export function createBoard ({ picture, name }) {
  return axios.post(`${baseUrl}/board`, { picture, name })
}