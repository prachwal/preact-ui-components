/**
 * Application configuration
 * Provides default values for build-time constants
 */

export interface AppConfig {
  version: string;
  build: {
    storybook: boolean;
    docs: boolean;
    coverage: boolean;
  };
  paths: {
    base: string;
    storybook: string;
    docs: string;
    coverage: string;
  };
}

// Build-time constants with fallbacks
const getBuildConstant = (
  key: string,
  defaultValue: string | boolean = false
): string | boolean => {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>)[key] !== undefined
  ) {
    return (window as unknown as Record<string, unknown>)[key] as
      | string
      | boolean;
  }

  // For SSR or when constants aren't available, use defaults
  if (
    typeof globalThis !== 'undefined' &&
    (globalThis as unknown as Record<string, unknown>)[key] !== undefined
  ) {
    return (globalThis as unknown as Record<string, unknown>)[key] as
      | string
      | boolean;
  }

  return defaultValue;
};

export const appConfig: AppConfig = {
  version: getBuildConstant('__APP_VERSION__', '1.0.0') as string,
  build: {
    storybook: getBuildConstant('__BUILD_STORYBOOK__', false) as boolean,
    docs: getBuildConstant('__BUILD_DOCS__', false) as boolean,
    coverage: getBuildConstant('__TEST_COVERAGE__', false) as boolean,
  },
  paths: {
    base: getBuildConstant('__VITE_BASE_PATH__', '/') as string,
    storybook: '',
    docs: '',
    coverage: '',
  },
};

// Initialize paths based on base path
const basePath = appConfig.paths.base === '/' ? '' : appConfig.paths.base;
appConfig.paths.storybook = appConfig.build.storybook
  ? `${basePath}/storybook/`
  : '#';
appConfig.paths.docs = appConfig.build.docs ? `${basePath}/docs/` : '#';
appConfig.paths.coverage = appConfig.build.coverage
  ? `${basePath}/coverage/`
  : '#';
