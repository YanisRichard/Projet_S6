import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = {
    projectId: 'zi5biwke',
    dataset: 'production',
    apiVersion: 'v2023-01-01',
    useCdn: true
  }

  const client = createClient(config)

  return {
    provide: {
      sanity: client
    }
  }
})