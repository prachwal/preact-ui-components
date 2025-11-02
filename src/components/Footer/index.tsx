import type { JSX } from 'preact';
import { memo } from 'preact/compat';
import { appConfig } from '../../config/app';

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

const FooterComponent = (): JSX.Element => {
  const { build, paths, version } = appConfig;

  return (
    <footer className='app-footer' role='contentinfo'>
      <div className='footer-content'>
        <div className='build-status'>
          <span className='build-status-label'>Build Status:</span>
          <div className='build-icons'>
            <a
              href={paths.storybook}
              className={`build-icon ${build.storybook ? 'enabled' : 'disabled'}`}
              title='Storybook'
              aria-label='Open Storybook'
              target={build.storybook ? '_blank' : undefined}
              rel={build.storybook ? 'noopener noreferrer' : undefined}
            >
              <StorybookIcon />
              <span className='icon-label'>SB</span>
            </a>
            <a
              href={paths.docs}
              className={`build-icon ${build.docs ? 'enabled' : 'disabled'}`}
              title='Documentation'
              aria-label='Open Documentation'
              target={build.docs ? '_blank' : undefined}
              rel={build.docs ? 'noopener noreferrer' : undefined}
            >
              <DocsIcon />
              <span className='icon-label'>Docs</span>
            </a>
            <a
              href={paths.coverage}
              className={`build-icon ${build.coverage ? 'enabled' : 'disabled'}`}
              title='Test Coverage'
              aria-label='Open Coverage Report'
              target={build.coverage ? '_blank' : undefined}
              rel={build.coverage ? 'noopener noreferrer' : undefined}
            >
              <CoverageIcon />
              <span className='icon-label'>Cov</span>
            </a>
          </div>
        </div>
        <div className='app-version'>v{version}</div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
