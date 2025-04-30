import axios from "axios";
import $axios, {API_URL} from ".";

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
})

$api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.setAuthorization(`Bearer ${accessToken}`)
    return config
  }, (error) => {
    console.log('Request failed >>>', error);
  }
)

$api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const {data} = await $axios.get('/auth/refresh')
        localStorage.setItem('accessToken', data.accessToken)
        return $api.request(originalRequest)
      } catch (error) {
        console.log('Not authorized')
      }
    }

    throw error
  }
)

export default $api