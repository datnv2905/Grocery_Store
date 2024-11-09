// nuxt.config.d.ts
import { NuxtConfig } from 'nuxt/schema'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    auth?: {
      origin?: string,
      enableGlobalAppMiddleware?: boolean,
      providers?: {
        google?: {
          clientId: string,
          clientSecret: string,
          authorizationUrl: string,
          tokenUrl: string,
          userInfoUrl: string,
        }
      }
    }
  }
}

export default NuxtConfig
