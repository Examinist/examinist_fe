import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/staff_portal": "http://localhost:3000",
      "/student_portal": "http://localhost:3000",
      "/coordinator_portal": "http://localhost:3000",
    },
  },
  plugins: [react()],
  envDir: "./src",
});
