import axios from 'axios'

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api'
export const journalAPI = axios.create({
  baseURL,
  // headers: {
  //   Authorization:
  //     (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
  // }
})
