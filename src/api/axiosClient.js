import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create(
  {
    // baseURL: process.env.REACT_APP_API_URL || 'https://api.newee.asia:5001',
    baseURL: 'https://api.newee.asia:5001',
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  },
  function (error) {
    console.warn(error)
    if (error.response.status === 404) {
      console.warn(error)
      return Promise.reject(error)
    }
  },
)

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('tokenSeller')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data.data) {
      return response.data.data
    } else if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    if (
      error === 'undefined' ||
      error === undefined ||
      error.response === undefined ||
      error.response === 'undefined'
    ) {
      return []
    } else if (error.response.status === 404 || error.response.status === 400) {
      throw new Error(`${error.config.url} not found`)
    } else if (error.response) {
      if (error.response.status === 500) {
        return []
      } else if (error.response.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
        return []
      }
    }
    return error.response.data || []
  },
)

export default axiosClient
