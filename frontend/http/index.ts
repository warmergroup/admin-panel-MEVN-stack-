import axios from "axios";


export const API_URL = 'http://localhost:8080'
// export const API_URL = getApiUrl();
// export const API_URL = getApi()

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
