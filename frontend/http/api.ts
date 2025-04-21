import axios from "axios";
import { API_URL } from ".";
import { useAuthStore } from "~/store/auth.store";

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

// REQUEST: Tokenni headerga qo‘shish
$api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// RESPONSE: Token yangilash va qayta so‘rov
$api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.post(`${API_URL}/api/auth/refresh`, {}, { withCredentials: true });
        localStorage.setItem('accessToken', data.accessToken);

        // AuthStore yangilash
        const authStore = useAuthStore();
        authStore.setUser(data.user);
        authStore.setIsAuth(true);

        return $api.request(originalRequest);
      } catch (err) {
        console.warn('Refresh token ishlamadi:', err);

        // Logout yoki router.push('/auth') qilish kerak bo'lishi mumkin
        const authStore = useAuthStore();
        authStore.setIsAuth(false);
        authStore.setUser(null);
        localStorage.removeItem('accessToken');

        // Optional: router.push('/auth')
      }
    }
    throw error;
  }
);

export default $api;
