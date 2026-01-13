import { defineConfig } from 'npm:rolldown-vite@7.2.5'
import react from 'npm:@vitejs/plugin-react@5.1.1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
