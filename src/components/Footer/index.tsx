import type { JSX } from 'preact';

const StorybookIcon = (): JSX.Element => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
    <path d='M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0zM6.5 11.5L3 8l1.5-1.5L6.5 8.5l5-5L13 4l-6.5 7.5z' />
  </svg>
);

const DocsIcon = (): JSX.Element => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
    <path d='M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0zm-.5 3h1v1h-1V3zm0 2h1v5h-1V5z' />
  </svg>
);

const CoverageIcon = (): JSX.Element => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
    <path d='M8 0l6.928 4v8L8 16 1.072 12V4L8 0z' />
  </svg>
);

export const Footer = (): JSX.Element => {
  const isStorybookEnabled = __BUILD_STORYBOOK__ === 'true';
  const isDocsEnabled = __BUILD_DOCS__ === 'true';
  const isCoverageEnabled = __TEST_COVERAGE__ === 'true';
  const basePath = __VITE_BASE_PATH__ === '/' ? '' : __VITE_BASE_PATH__;

  const storybookUrl = isStorybookEnabled ? `${basePath}/storybook/` : '#';
  const docsUrl = isDocsEnabled ? `${basePath}/docs/` : '#';
  const coverageUrl = isCoverageEnabled ? `${basePath}/coverage/` : '#';

  return (
    <footer className='app-footer' role='contentinfo'>
      <div className='footer-content'>
        <div className='build-status'>
          <span className='build-status-label'>Build Status:</span>
          <div className='build-icons'>
            <a
              href={storybookUrl}
              className={`build-icon ${isStorybookEnabled ? 'enabled' : 'disabled'}`}
              title='Storybook'
              aria-label='Open Storybook'
              target={isStorybookEnabled ? '_blank' : undefined}
              rel={isStorybookEnabled ? 'noopener noreferrer' : undefined}
            >
              <StorybookIcon />
              <span className='icon-label'>SB</span>
            </a>
            <a
              href={docsUrl}
              className={`build-icon ${isDocsEnabled ? 'enabled' : 'disabled'}`}
              title='Documentation'
              aria-label='Open Documentation'
              target={isDocsEnabled ? '_blank' : undefined}
              rel={isDocsEnabled ? 'noopener noreferrer' : undefined}
            >
              <DocsIcon />
              <span className='icon-label'>Docs</span>
            </a>
            <a
              href={coverageUrl}
              className={`build-icon ${isCoverageEnabled ? 'enabled' : 'disabled'}`}
              title='Test Coverage'
              aria-label='Open Coverage Report'
              target={isCoverageEnabled ? '_blank' : undefined}
              rel={isCoverageEnabled ? 'noopener noreferrer' : undefined}
            >
              <CoverageIcon />
              <span className='icon-label'>Cov</span>
            </a>
          </div>
        </div>
        <div className='app-version'>v{__APP_VERSION__}</div>
      </div>
    </footer>
  );
};
