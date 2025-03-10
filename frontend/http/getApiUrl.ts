export const getApiUrl = () => {
  console.log('process env fayli:', process);
  return process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
};
