export default defineNuxtConfig({
  compatibilityDate: "2024-07-27",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
  ],
  css: ["@/assets/styles.css"],
  googleFonts: {
    families: {
      Overpass: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
  },
  colorMode: {
    preference: "dark",
  },
});