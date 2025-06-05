import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    let localStorageData = window.localStorage.getItem('user-storage')

    if (localStorageData && typeof localStorageData === 'string') {
      localStorageData = JSON.parse(localStorageData)
      const accessToken = localStorageData.state?.token
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data
  },
)
export default instance
