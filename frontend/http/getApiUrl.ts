export const getApiUrl = () => {
  console.log('process env:', import.meta.env.NUXT_PUBLIC_API_URL);

  return import.meta.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
};
