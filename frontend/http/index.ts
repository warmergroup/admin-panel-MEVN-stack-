import axios from "axios";
  
export const API_URL = import.meta.env.VITE_APP_FILE_API_URL;
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
