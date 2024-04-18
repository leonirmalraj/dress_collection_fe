import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
        // "@": "/public/react-asset",
    },
},

  plugins: [react()],

  build: {
    outDir: 'build', // specify the custom output folder name
  },

})
