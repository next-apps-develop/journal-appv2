'use client'

import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

console.log({ baseURL })
export const journalAPI = axios.create({
  baseURL,
  // headers: {
  //   Authorization:
  //     (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
  // }
})
