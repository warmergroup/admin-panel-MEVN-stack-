import axios from "axios";


// export const API_URL = 'https://admin-panel-mevn-stack-backend.vercel.app'
// export const API_URL = import.meta.env.VITE_APP_FILE_API_URL;
export const API_URL = 'http://localhost:8080'
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
