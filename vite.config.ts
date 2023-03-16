import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/admin_portal": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
