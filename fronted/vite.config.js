import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom plugin to show Vercel link in terminal
function showDeployedLink() {
  return {
    name: 'show-deployed-link',
    configureServer(server) {
      const _printUrls = server.printUrls.bind(server)
      server.printUrls = () => {
        _printUrls()
        console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mNetwork:\x1b[0m  \x1b[36mhttps://quickart-nine.vercel.app\x1b[0m`)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), showDeployedLink()],
})