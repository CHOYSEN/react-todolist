import { defineConfig } from 'vite'
import windiCSS from 'vite-plugin-windicss'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windiCSS(),
    reactRefresh()
  ]
})
