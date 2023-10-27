import { baseUrl } from './setup'
import axios from 'axios'

export function login ({ email, password }) {
  return axios.post(`${baseUrl}/login`, { email, password })
}