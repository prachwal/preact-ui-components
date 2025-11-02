import preact from '@preact/preset-vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// Read package.json
const packageJson = JSON.parse(
  readFileSync(resolve('./package.json'), 'utf-8')
);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  console.log(
    'All env vars starting with VITE:',
    Object.keys(env).filter(key => key.startsWith('VITE_'))
  );
  console.log('VITE_BUILD_STORYBOOK:', env.VITE_BUILD_STORYBOOK);
  console.log('VITE_BUILD_DOCS:', env.VITE_BUILD_DOCS);
  console.log('VITE_ENABLE_COVERAGE:', env.VITE_ENABLE_COVERAGE);
  console.log('VITE_BASE_PATH:', env.VITE_BASE_PATH);

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [preact()],
    css: {
      preprocessorOptions: {
        scss: {
          // Use modern SCSS API - 'modern-compiler' or 'modern' for dart-sass 1.77.0+
          api: 'modern-compiler',
          // Import paths for SCSS modules
          loadPaths: [resolve(__dirname, 'src/styles')],
          // Silence deprecation warnings for legacy code
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@components': resolve(__dirname, 'src/components'),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __BUILD_STORYBOOK__: JSON.stringify(env.VITE_BUILD_STORYBOOK || 'false'),
      __BUILD_DOCS__: JSON.stringify(env.VITE_BUILD_DOCS || 'false'),
      __TEST_COVERAGE__: JSON.stringify(env.VITE_ENABLE_COVERAGE || 'false'),
      __VITE_BASE_PATH__: JSON.stringify(env.VITE_BASE_PATH || '/'),
    },
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
  };
});
