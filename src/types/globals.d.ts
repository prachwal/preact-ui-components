// Global constants injected by Vite
declare const __APP_VERSION__: string;
declare const __BUILD_STORYBOOK__: string;
declare const __BUILD_DOCS__: string;
declare const __TEST_COVERAGE__: string;
declare const __VITE_BASE_PATH__: string;

// Extend ImportMeta interface for Vite
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
