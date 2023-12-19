import { baseUrl } from './setup'
import axios from 'axios'

export function getChart () {
  return axios.get(`${baseUrl}/chart`)
}

export function getChartDetail (boardId) {
  return axios.get(`${baseUrl}/chart/${boardId}`)
}