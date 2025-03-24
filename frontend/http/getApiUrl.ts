import { useNuxtApp } from '#app'

export const getApiUrl = () => {
  const { $config } = useNuxtApp()
  return $config.public.apiBase
}
