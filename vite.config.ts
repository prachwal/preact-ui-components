import preact from '@preact/preset-vite';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [preact()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './dist/coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/stories/**',
        '**/index.ts',
      ],
    },
    reporters: ['junit'],
    outputFile: './dist/junit.xml',
  },
});
