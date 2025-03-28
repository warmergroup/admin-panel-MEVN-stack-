export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/vue-query.ts"],
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080",
    },
  },
});
