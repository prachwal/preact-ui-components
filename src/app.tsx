import { useCallback, useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import { Button } from './stories/Button';
import { Page, StorybookContent } from './stories/Page';
import viteLogo from '/vite.svg';

type Tab = 'home' | 'storybook';

interface HomeTabProps {
  count: number;
  onIncrement: () => void;
}

function HomeTab({ count, onIncrement }: HomeTabProps) {
  return (
    <>
      <div className='logo-container'>
        <a href='https://vite.dev' target='_blank' rel='noopener noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a
          href='https://preactjs.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={preactLogo} className='logo preact' alt='Preact logo' />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div className='card'>
        <Button label={`count is ${count}`} onClick={onIncrement} />
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Check out{' '}
        <a
          href='https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p className='read-the-docs'>
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  );
}

export function App() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const incrementCount = useCallback(() => setCount(c => c + 1), []);
  const setHomeTab = useCallback(() => setActiveTab('home'), []);
  const setStorybookTab = useCallback(() => setActiveTab('storybook'), []);

  return (
    <Page>
      <nav className='tab-navigation'>
        <Button
          label='Home'
          onClick={setHomeTab}
          primary={activeTab === 'home'}
          size='medium'
        />
        <Button
          label='Storybook'
          onClick={setStorybookTab}
          primary={activeTab === 'storybook'}
          size='medium'
        />
      </nav>

      {activeTab === 'home' ? (
        <HomeTab count={count} onIncrement={incrementCount} />
      ) : (
        <StorybookContent />
      )}
    </Page>
  );
}
