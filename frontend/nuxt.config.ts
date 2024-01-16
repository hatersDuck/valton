// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      baseURL: 'http://92.127.176.51:5555/',
    },
  },
})
