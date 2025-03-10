const config = useRuntimeConfig();
export const getApiUrl = () => {
  console.log('process env fayli:', config );
  return process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
};
