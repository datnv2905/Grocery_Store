// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: true,
  css: [
    '/assets/css/background.css', // Import file CSS bạn vừa tạo
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  plugins: [{ src: '~/plugins/bootstrap.client.ts', mode: 'client' }],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['usebootstrap', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID, // Expose this to the client
    },
  },
  app: {
    head: {
      title: 'Market_Supper',
      meta: [
        {name: 'description', content: 'Everything about Nuxt 3'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }
      ]
    }
  },
})