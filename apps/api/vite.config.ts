import honox from 'honox/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        server: './app/server.ts',
      },
    },
    ssr: true,
  },
  plugins: [honox({ entry: './app/server.ts' })],
});
