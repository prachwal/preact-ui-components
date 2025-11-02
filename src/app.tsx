import { useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import { Button } from './stories/Button';
import { Page } from './stories/Page';
import viteLogo from '/vite.svg';

export function App() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'storybook'>('home');

  return (
    <Page>
      <div style={{ marginBottom: '2rem' }}>
        <Button
          label='Home'
          onClick={() => setActiveTab('home')}
          primary={activeTab === 'home'}
          size='medium'
        />
        <Button
          label='Storybook'
          onClick={() => setActiveTab('storybook')}
          primary={activeTab === 'storybook'}
          size='medium'
          style={{ marginLeft: '10px' }}
        />
      </div>

      {activeTab === 'home' && (
        <>
          <div>
            <a href='https://vite.dev' target='_blank'>
              <img src={viteLogo} className='logo' alt='Vite logo' />
            </a>
            <a href='https://preactjs.com' target='_blank'>
              <img src={preactLogo} className='logo preact' alt='Preact logo' />
            </a>
          </div>
          <h1>Vite + Preact</h1>
          <div className='card'>
            <Button
              label={`count is ${count}`}
              onClick={() => setCount(count => count + 1)}
            />
            <p>
              Edit <code>src/app.tsx</code> and save to test HMR
            </p>
          </div>
          <p>
            Check out{' '}
            <a
              href='https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app'
              target='_blank'
            >
              create-preact
            </a>
            , the official Preact + Vite starter
          </p>
          <p className='read-the-docs'>
            Click on the Vite and Preact logos to learn more
          </p>
        </>
      )}

      {activeTab === 'storybook' && (
        <>
          <h2>Pages in Storybook</h2>
          <p>
            We recommend building UIs with a{' '}
            <a
              href='https://componentdriven.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong>component-driven</strong>
            </a>{' '}
            process starting with atomic components and ending with pages.
          </p>
          <p>
            Render pages with mock data. This makes it easy to build and review
            page states without needing to navigate to them in your app. Here
            are some handy patterns for managing page data in Storybook:
          </p>
          <ul>
            <li>
              Use a higher-level connected component. Storybook helps you
              compose such data from the "args" of child component stories
            </li>
            <li>
              Assemble data in the page component from your services. You can
              mock these services out using Storybook.
            </li>
          </ul>
          <p>
            Get a guided tutorial on component-driven development at{' '}
            <a
              href='https://storybook.js.org/tutorials/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Storybook tutorials
            </a>
            . Read more in the{' '}
            <a
              href='https://storybook.js.org/docs'
              target='_blank'
              rel='noopener noreferrer'
            >
              docs
            </a>
            .
          </p>
          <div className='tip-wrapper'>
            <span className='tip'>Tip</span> Adjust the width of the canvas with
            the{' '}
            <svg
              width='10'
              height='10'
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  d='M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z'
                  id='a'
                  fill='#999'
                />
              </g>
            </svg>
            Viewports addon in the toolbar
          </div>
        </>
      )}
    </Page>
  );
}
