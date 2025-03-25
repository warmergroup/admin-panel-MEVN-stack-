import axios from "axios";

export const API_URL = 'https://admin-panel-mevn-stack-backend.vercel.app'

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
