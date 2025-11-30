import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9ejs3m2v',
    dataset: 'production'
  },
  studioHost: 'nomusicians',
  vite: (config) => {
    return {
      ...config,
      server: {
        ...config.server,
        host: true,
        allowedHosts: true
      }
    }
  }
})

