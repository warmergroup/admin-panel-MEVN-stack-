export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {enabled: true},
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/vue-query.ts"],
  runtimeConfig: {
    public: {
      API_URL: process.env.VITE_APP_FILE_API_URL
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000, // Istalgan portni yozishingiz mumkin
  }
});
