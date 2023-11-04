import axios from 'axios'

export const journalAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization:
      (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
  }
})
