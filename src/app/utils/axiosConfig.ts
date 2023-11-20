import axios from 'axios'

export const journalAPI = axios.create({
  baseURL: 'https://fluffy-trout-7r654qx5559hrvg9-3000.app.github.dev//api',
  // headers: {
  //   Authorization:
  //     (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
  // }
})
