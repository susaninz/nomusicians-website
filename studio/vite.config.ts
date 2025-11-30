import {defineConfig} from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.ngrok.io', 'noadmin.ngrok.io', 'localhost']
  }
})
