import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import GoogleLogin from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(GoogleLogin, {
    clientId: config.public.googleClientId, // Use the client ID from runtimeConfig
  })
})
