# 01. Komponenty Podstawowe - Button

## Przegląd Komponentu

Komponent `Button` to podstawowy element interfejsu użytkownika służący do uruchamiania akcji. Zapewnia spójne zachowanie, dostępność i różnorodność wariantów wizualnych.

### Kluczowe Funkcjonalności

- **Wiele Wariantów**: Primary, secondary, outline, ghost, danger
- **Rozmiary**: Small, medium, large, extra large
- **Stany**: Default, hover, focus, active, disabled, loading
- **Ikony**: Wsparcie dla ikon z lewej/prawej strony
- **Dostępność**: Pełne wsparcie dla czytników ekranowych
- **Responsywność**: Dostosowuje się do różnych rozmiarów ekranów

## API Komponentu

### ButtonProps Interface

```typescript
export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'type'> {
  /** Wariant wizualny przycisku */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Czy przycisk jest w stanie ładowania */
  loading?: boolean;

  /** Czy przycisk jest wyłączony */
  disabled?: boolean;

  /** Ikona wyświetlana przed tekstem */
  startIcon?: React.ReactNode;

  /** Ikona wyświetlana po tekście */
  endIcon?: React.ReactNode;

  /** Czy przycisk zajmuje pełną szerokość kontenera */
  fullWidth?: boolean;

  /** Typ przycisku HTML */
  type?: 'button' | 'submit' | 'reset';

  /** Funkcja wywoływana po kliknięciu */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Dzieci komponentu (tekst przycisku) */
  children: React.ReactNode;
}
```

### Przykład Użycia

```tsx
import { Button } from '@preact-ui/components';

// Podstawowe użycie
<Button onClick={() => console.log('Clicked!')}>
  Kliknij mnie
</Button>

// Z wariantami
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Z rozmiarami
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Ze stanami
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Z ikonami
<Button startIcon={<Icon name="plus" />}>
  Dodaj
</Button>
<Button endIcon={<Icon name="arrow-right" />}>
  Dalej
</Button>

// Pełna szerokość
<Button fullWidth>
  Pełna Szerokość
</Button>
```

## Implementacja

### Struktura Plików

```text
src/components/Button/
├── index.tsx          # Główny komponent
├── Button.test.tsx    # Testy jednostkowe
├── Button.stories.tsx # Storybook stories
└── Button.mdx         # Dokumentacja MDX
```

### Główny Komponent

```tsx
// src/components/Button/index.tsx
import { memo, useMemo } from 'preact/compat';
import { clsx } from 'clsx';
import './Button.scss';

export const Button = memo<ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    fullWidth = false,
    type = 'button',
    onClick,
    children,
    className,
    ...props
  }) => {
    // Obliczanie klas CSS
    const buttonClasses = useMemo(
      () =>
        clsx(
          'btn',
          `btn--${variant}`,
          `btn--${size}`,
          {
            'btn--loading': loading,
            'btn--disabled': disabled,
            'btn--full-width': fullWidth,
            'btn--with-start-icon': startIcon,
            'btn--with-end-icon': endIcon,
          },
          className
        ),
      [variant, size, loading, disabled, fullWidth, startIcon, endIcon, className]
    );

    // Obsługa kliknięcia
    const handleClick = useMemo(() => {
      if (disabled || loading) return undefined;
      return onClick;
    }, [disabled, loading, onClick]);

    return (
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className='btn__spinner' aria-hidden='true'>
            <Spinner size='sm' />
          </span>
        )}

        {startIcon && (
          <span className='btn__start-icon' aria-hidden='true'>
            {startIcon}
          </span>
        )}

        <span className='btn__content'>{children}</span>

        {endIcon && (
          <span className='btn__end-icon' aria-hidden='true'>
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Style SCSS

```scss
// src/components/Button/Button.scss
@use '../../styles/themes/theme-mixins' as theme;
@use '../../styles/utilities/mixins' as mixins;
@use '../../styles/utilities/animations' as animations;

// Base button styles
.btn {
  @include mixins.flex(row, nowrap, center, center, theme.spacing(2));
  @include mixins.transition(all, fast);
  @include mixins.focus-ring();

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: theme.spacing(2);
  padding: theme.spacing(2) theme.spacing(4);
  border: 1px solid transparent;
  border-radius: theme.border-radius(md);
  font-family: inherit;
  font-size: theme.font-size(base);
  font-weight: theme.font-weight(medium);
  line-height: theme.line-height(snug);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: all theme.transition-duration(fast) theme.transition-timing(smooth);

  // Remove default button styles
  background: none;
  appearance: none;
  -webkit-appearance: none;

  // Content wrapper
  &__content {
    display: flex;
    align-items: center;
    gap: theme.spacing(1);
  }

  // Icon styles
  &__start-icon,
  &__end-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  // Spinner for loading state
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  // Size variants
  &--sm {
    padding: theme.spacing(1.5) theme.spacing(3);
    font-size: theme.font-size(sm);
    min-height: 2rem;
  }

  &--md {
    padding: theme.spacing(2) theme.spacing(4);
    font-size: theme.font-size(base);
    min-height: 2.5rem;
  }

  &--lg {
    padding: theme.spacing(2.5) theme.spacing(5);
    font-size: theme.font-size(lg);
    min-height: 3rem;
  }

  &--xl {
    padding: theme.spacing(3) theme.spacing(6);
    font-size: theme.font-size(xl);
    min-height: 3.5rem;
  }

  // Variant styles
  &--primary {
    background-color: theme.colors(primary, 500);
    color: theme.colors(primary, 50);
    border-color: theme.colors(primary, 500);

    &:hover:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(primary, 600);
      border-color: theme.colors(primary, 600);
      transform: translateY(-1px);
      box-shadow: theme.shadow(md);
    }

    &:active:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(primary, 700);
      border-color: theme.colors(primary, 700);
      transform: translateY(0);
    }

    &:focus-visible {
      outline-color: theme.colors(primary, 300);
    }
  }

  &--secondary {
    background-color: theme.colors(neutral, 100);
    color: theme.colors(neutral, 900);
    border-color: theme.colors(neutral, 300);

    &:hover:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(neutral, 200);
      border-color: theme.colors(neutral, 400);
    }

    &:active:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(neutral, 300);
      border-color: theme.colors(neutral, 500);
    }

    &:focus-visible {
      outline-color: theme.colors(neutral, 500);
    }
  }

  &--outline {
    background-color: transparent;
    color: theme.colors(primary, 600);
    border-color: theme.colors(primary, 300);

    &:hover:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(primary, 50);
      border-color: theme.colors(primary, 400);
    }

    &:active:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(primary, 100);
      border-color: theme.colors(primary, 500);
    }

    &:focus-visible {
      outline-color: theme.colors(primary, 300);
    }
  }

  &--ghost {
    background-color: transparent;
    color: theme.colors(neutral, 700);
    border-color: transparent;

    &:hover:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(neutral, 100);
    }

    &:active:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(neutral, 200);
    }

    &:focus-visible {
      outline-color: theme.colors(neutral, 400);
    }
  }

  &--danger {
    background-color: theme.colors(error, 500);
    color: theme.colors(error, 50);
    border-color: theme.colors(error, 500);

    &:hover:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(error, 600);
      border-color: theme.colors(error, 600);
    }

    &:active:not(:disabled):not(.btn--loading) {
      background-color: theme.colors(error, 700);
      border-color: theme.colors(error, 700);
    }

    &:focus-visible {
      outline-color: theme.colors(error, 300);
    }
  }

  // State modifiers
  &--loading {
    cursor: not-allowed;
    opacity: 0.7;

    .btn__content {
      opacity: 0.7;
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  &--full-width {
    width: 100%;
    justify-content: center;
  }

  // Icon spacing adjustments
  &--with-start-icon .btn__content {
    margin-left: theme.spacing(1);
  }

  &--with-end-icon .btn__content {
    margin-right: theme.spacing(1);
  }

  // High contrast mode support
  @media (prefers-contrast: high) {
    &--primary {
      background-color: #000000;
      color: #ffffff;
      border-color: #000000;
    }

    &--secondary {
      background-color: #ffffff;
      color: #000000;
      border-color: #000000;
    }
  }

  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }

    &:active {
      transform: none;
    }
  }

  // Dark theme adjustments
  [data-theme='dark'] & {
    &--secondary {
      background-color: theme.colors(neutral, 800);
      color: theme.colors(neutral, 100);
      border-color: theme.colors(neutral, 700);

      &:hover:not(:disabled):not(.btn--loading) {
        background-color: theme.colors(neutral, 700);
        border-color: theme.colors(neutral, 600);
      }

      &:active:not(:disabled):not(.btn--loading) {
        background-color: theme.colors(neutral, 600);
        border-color: theme.colors(neutral, 500);
      }
    }

    &--ghost {
      color: theme.colors(neutral, 300);

      &:hover:not(:disabled):not(.btn--loading) {
        background-color: theme.colors(neutral, 800);
      }

      &:active:not(:disabled):not(.btn--loading) {
        background-color: theme.colors(neutral, 700);
      }
    }
  }
}
```

## Testy Jednostkowe

### Button.test.tsx

```tsx
// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import { Button } from './index';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn--primary', 'btn--md');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--secondary');

    rerender(<Button variant='outline'>Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--outline');

    rerender(<Button variant='ghost'>Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--ghost');

    rerender(<Button variant='danger'>Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--danger');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--sm');

    rerender(<Button size='lg'>Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--lg');

    rerender(<Button size='xl'>Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--xl');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('renders with start icon', () => {
    render(<Button startIcon={<span data-testid='start-icon'>🚀</span>}>With Icon</Button>);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn--with-start-icon');
  });

  it('renders with end icon', () => {
    render(<Button endIcon={<span data-testid='end-icon'>→</span>}>With Icon</Button>);

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn--with-end-icon');
  });

  it('supports full width', () => {
    render(<Button fullWidth>Full Width</Button>);

    expect(screen.getByRole('button')).toHaveClass('btn--full-width');
  });

  it('passes through additional props', () => {
    render(<Button data-testid='custom-button'>Custom</Button>);

    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Button loading>Accessible Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('supports different button types', () => {
    const { rerender } = render(<Button type='submit'>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type='reset'>Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });
});
```

## Storybook Stories

### Button.stories.tsx

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/preact';
import { Button } from './index';
import { Icon } from '../Icon'; // Assuming Icon component exists

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// State stories
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

// Icon stories
export const WithStartIcon: Story = {
  args: {
    startIcon: <Icon name='plus' />,
    children: 'Add Item',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <Icon name='arrow-right' />,
    children: 'Continue',
  },
};

// Full width story
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// Interactive story
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};

// All variants grid
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
    >
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='danger'>Danger</Button>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
};
```

## Dokumentacja MDX

### Button.mdx

```mdx
import { Meta, Canvas, Controls } from '@storybook/blocks';
import { Button } from './index';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Przycisk to podstawowy komponent interfejsu służący do uruchamiania akcji użytkownika.

## Przegląd

Komponent Button zapewnia spójne zachowanie i wygląd dla wszystkich interaktywnych elementów w aplikacji.

<Canvas of={ButtonStories.Default} />

## Warianty

### Primary

Główny przycisk akcji, używany dla najważniejszych działań.

<Canvas of={ButtonStories.Primary} />

### Secondary

Przycisk dla drugorzędnych akcji.

<Canvas of={ButtonStories.Secondary} />

### Outline

Przycisk z obramowaniem, dla mniej ważnych akcji.

<Canvas of={ButtonStories.Outline} />

### Ghost

Przycisk bez tła, dla subtelnych akcji.

<Canvas of={ButtonStories.Ghost} />

### Danger

Przycisk dla destrukcyjnych akcji.

<Canvas of={ButtonStories.Danger} />

## Rozmiary

<Canvas of={ButtonStories.AllSizes} />

## Stany

### Loading

Pokazuje wskaźnik ładowania podczas przetwarzania akcji.

<Canvas of={ButtonStories.Loading} />

### Disabled

Wyłączony przycisk, nie można go kliknąć.

<Canvas of={ButtonStories.Disabled} />

## Ikony

Przyciski mogą zawierać ikony dla lepszego kontekstu wizualnego.

<Canvas of={ButtonStories.WithStartIcon} />
<Canvas of={ButtonStories.WithEndIcon} />

## Pełna Szerokość

<Canvas of={ButtonStories.FullWidth} />

## API

<Controls of={ButtonStories.Default} />

## Dostępność

Komponent Button jest w pełni dostępny:

- Używa odpowiedniego elementu `<button>`
- Obsługuje atrybuty `aria-disabled` dla stanów ładowania/wyłączenia
- Zapewnia odpowiednie kontrasty kolorów
- Wspiera nawigację klawiszową
- Czytniki ekranowe prawidłowo rozpoznają przycisk

## Najlepsze Praktyki

### Używaj Odpowiednich Wariantów

- **Primary**: Dla głównych akcji (zapisz, wyślij, kontynuuj)
- **Secondary**: Dla drugorzędnych akcji (anuluj, wróć)
- **Outline**: Dla akcji w formularzach lub na kartach
- **Ghost**: Dla akcji w nagłówkach lub paskach narzędzi
- **Danger**: Tylko dla destrukcyjnych akcji (usuń, resetuj)

### Rozważaj Kontekst

- Używaj jednego primary button na sekcję
- Grupuj powiązane przyciski
- Zapewniaj jasne etykiety

### Dostępność

- Zawsze podawaj opisowy tekst przycisku
- Unikaj ikon bez tekstu (oprócz dobrze znanych)
- Testuj z klawiaturą i czytnikami ekranowymi

### Wydajność

- Używaj `memo()` dla stabilności
- Unikaj niepotrzebnych re-renderów
- Lazy load ikony jeśli to możliwe
```

## Wzorce Użycia

### Przyciski Akcji

```tsx
// Formularz z przyciskami akcji
function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <div className='form-actions'>
        <Button variant='outline' type='button'>
          Anuluj
        </Button>
        <Button variant='primary' type='submit' loading={loading}>
          Wyślij
        </Button>
      </div>
    </form>
  );
}
```

### Przyciski Nawigacji

```tsx
// Paginacja z przyciskami nawigacji
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='pagination'>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        startIcon={<Icon name='chevron-left' />}
      >
        Poprzednia
      </Button>

      <span className='pagination-info'>
        Strona {currentPage} z {totalPages}
      </span>

      <Button
        variant='outline'
        size='sm'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        endIcon={<Icon name='chevron-right' />}
      >
        Następna
      </Button>
    </div>
  );
}
```

### Przyciski w Modalach

```tsx
// Modal z przyciskami akcji
function ConfirmationModal({ onConfirm, onCancel, loading }) {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>Potwierdź akcję</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Czy na pewno chcesz usunąć ten element?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline' onClick={onCancel}>
          Anuluj
        </Button>
        <Button variant='danger' onClick={onConfirm} loading={loading}>
          Usuń
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

## Testowanie

### Testy Integracyjne

```tsx
// Button.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button Integration', () => {
  it('works in a form submission flow', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <Button type='submit'>Submit Form</Button>
      </form>
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('handles async operations correctly', async () => {
    const mockAsyncAction = jest.fn().mockResolvedValue(undefined);

    const TestComponent = () => {
      const [loading, setLoading] = useState(false);

      const handleClick = async () => {
        setLoading(true);
        await mockAsyncAction();
        setLoading(false);
      };

      return (
        <Button loading={loading} onClick={handleClick}>
          Async Action
        </Button>
      );
    };

    render(<TestComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn--loading');

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveClass('btn--loading');
    });
  });
});
```

## Wydajność

### Optymalizacje

1. **Memoization**: Komponent używa `memo()` do zapobiegania niepotrzebnych re-renderów
2. **Callback Memoization**: Funkcje callback są memoizowane z `useMemo`
3. **CSS Optimization**: Style są optymalizowane dla lepszej wydajności
4. **Icon Lazy Loading**: Ikony mogą być lazy loadowane jeśli to skonfigurowane

### Metryki Wydajności

```typescript
// Performance monitoring
const ButtonWithMetrics = memo<ButtonProps>((props) => {
  const startTime = useRef<number>();

  useEffect(() => {
    startTime.current = performance.now();
  });

  const handleClick = useCallback((event) => {
    const clickTime = performance.now();
    const renderTime = startTime.current ? clickTime - startTime.current : 0;

    // Log performance metrics
    console.log(`Button render time: ${renderTime}ms`);

    props.onClick?.(event);
  }, [props.onClick]);

  return <Button {...props} onClick={handleClick} />;
});
```

## Rozszerzalność

### Custom Variants

```tsx
// Extended button with custom variants
interface ExtendedButtonProps extends ButtonProps {
  variant?: ButtonProps['variant'] | 'success' | 'warning';
}

const ExtendedButton = memo<ExtendedButtonProps>(({ variant, ...props }) => {
  const customClass =
    variant === 'success' ? 'btn--success' : variant === 'warning' ? 'btn--warning' : '';

  return (
    <Button
      {...props}
      variant={variant === 'success' || variant === 'warning' ? 'primary' : variant}
      className={customClass}
    />
  );
});
```

### Compound Components

```tsx
// Button group component
interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

const ButtonGroup = memo<ButtonGroupProps>(
  ({ children, variant = 'horizontal', spacing = 'md' }) => {
    const groupClasses = clsx(
      'btn-group',
      `btn-group--${variant}`,
      `btn-group--spacing-${spacing}`
    );

    return (
      <div className={groupClasses} role='group'>
        {children}
      </div>
    );
  }
);

// Usage
<ButtonGroup spacing='sm'>
  <Button variant='outline' size='sm'>
    Edit
  </Button>
  <Button variant='outline' size='sm'>
    Delete
  </Button>
  <Button variant='primary' size='sm'>
    Save
  </Button>
</ButtonGroup>;
```

## Migracja

### Z HTML Button

```tsx
// Before
<button className="custom-button" onClick={handleClick}>
  Click me
</button>

// After
<Button onClick={handleClick}>
  Click me
</Button>
```

### Z Innych Bibliotek

```tsx
// From Material-UI
// <MuiButton variant="contained" color="primary">Button</MuiButton>

// To Preact UI
<Button variant="primary">Button</Button>

// From Ant Design
// <AntButton type="primary" size="large">Button</AntButton>

// To Preact UI
<Button variant="primary" size="lg">Button</Button>
```

## Troubleshooting

### Częste Problemy

#### Przycisk nie reaguje na kliknięcia

- Sprawdź czy nie jest w stanie `disabled` lub `loading`
- Upewnij się, że `onClick` jest prawidłowo przekazany
- Sprawdź czy nie ma nakładających się elementów

#### Nieprawidłowe style

- Sprawdź czy theme jest prawidłowo załadowany
- Upewnij się, że CSS jest importowany
- Sprawdź konsolę na błędy CSS

#### Problemy z dostępnością

- Użyj unikalnych etykiet dla przycisków
- Dodaj `aria-label` dla przycisków z samymi ikonami
- Testuj z czytnikami ekranowymi

#### Problemy z wydajnością

- Upewnij się, że callbacki są memoizowane
- Unikaj tworzenia nowych funkcji w render
- Użyj `React.memo` dla komponentów rodziców
