import { baseUrl } from './setup'
import axios from 'axios'

export function createEmployee ({ name, email, position, salary, status, role }) {
  axios.post(`${baseUrl}/employee`, { name, email, position, salary, status, role })
}
