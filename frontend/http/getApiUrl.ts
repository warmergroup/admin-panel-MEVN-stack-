export const getApiUrl = () => {
  console.log('process env fayli:', process.env);
  return process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
  // return process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
};
