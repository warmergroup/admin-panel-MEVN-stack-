import axios from "axios";

export const API_URL = import.meta.env.VITE_APP_API_URL;
console.log(API_URL);
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
