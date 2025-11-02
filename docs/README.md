# Dokumentacja Systemu Komponentów UI

## Spis Treści

### System SCSS

- [00_scss_system.md](00_scss_system.md) - Architektura systemu SCSS, zmienne, mixiny, funkcje
- [00_scss_themes.md](00_scss_themes.md) - System motywów jasny/ciemny, CSS custom properties
- [00_scss_utilities.md](00_scss_utilities.md) - Narzędzia pomocnicze, responsywność, animacje

### Komponenty Podstawowe

- [01_komponenty_podstawowe_button.md](01_komponenty_podstawowe_button.md) - Przyciski (Button, ButtonGroup, IconButton)
- [01_komponenty_podstawowe_input.md](01_komponenty_podstawowe_input.md) - Pola wejściowe (Input, Textarea, Select)
- [01_komponenty_podstawowe_typography.md](01_komponenty_podstawowe_typography.md) - Tekst i nagłówki (Heading, Text, Link)
- [01_komponenty_podstawowe_layout.md](01_komponenty_podstawowe_layout.md) - Układ (Container, Flex, Grid, Spacer)

### Komponenty Zaawansowane

- [02_komponenty_zaawansowane_form.md](02_komponenty_zaawansowane_form.md) - Formularze (Form, FormField, Validation)
- [02_komponenty_zaawansowane_data_display.md](02_komponenty_zaawansowane_data_display.md) - Wyświetlanie danych (Table, List, Card, Badge)
- [02_komponenty_zaawansowane_feedback.md](02_komponenty_zaawansowane_feedback.md) - Informacje zwrotne (Alert, Toast, Modal, Tooltip)
- [02_komponenty_zaawansowane_navigation.md](02_komponenty_zaawansowane_navigation.md) - Nawigacja (Menu, Tabs, Breadcrumb, Pagination)

### Komponenty Specjalistyczne

- [03_komponenty_specjalistyczne_charts.md](03_komponenty_specjalistyczne_charts.md) - Wykresy i wizualizacje danych
- [03_komponenty_specjalistyczne_date_time.md](03_komponenty_specjalistyczne_date_time.md) - Wybór daty/czasu (DatePicker, TimePicker, Calendar)
- [03_komponenty_specjalistyczne_upload.md](03_komponenty_specjalistyczne_upload.md) - Upload plików (FileUpload, DragDrop, Progress)
- [03_komponenty_specjalistyczne_editor.md](03_komponenty_specjalistyczne_editor.md) - Edytory (RichText, Markdown, Code)

### Komponenty Biznesowe

- [04_komponenty_biznesowe_dashboard.md](04_komponenty_biznesowe_dashboard.md) - Dashboard (Widgets, Metrics, Charts)
- [04_komponenty_biznesowe_ecommerce.md](04_komponenty_biznesowe_ecommerce.md) - E-commerce (ProductCard, Cart, Checkout)
- [04_komponenty_biznesowe_admin.md](04_komponenty_biznesowe_admin.md) - Panel admin (DataTable, Filters, Actions)

### Narzędzia Deweloperskie

- [05_narzedzia_deweloperskie_setup.md](05_narzedzia_deweloperskie_setup.md) - Konfiguracja środowiska deweloperskiego
- [05_narzedzia_deweloperskie_testing.md](05_narzedzia_deweloperskie_testing.md) - Testowanie komponentów
- [05_narzedzia_deweloperskie_storybook.md](05_narzedzia_deweloperskie_storybook.md) - Storybook integration
- [05_narzedzia_deweloperskie_build.md](05_narzedzia_deweloperskie_build.md) - Build i deployment

### Przewodniki

- [06_przewodniki_migration.md](06_przewodniki_migration.md) - Migracja z innych bibliotek
- [06_przewodniki_best_practices.md](06_przewodniki_best_practices.md) - Najlepsze praktyki
- [06_przewodniki_accessibility.md](06_przewodniki_accessibility.md) - Dostępność (a11y)
- [06_przewodniki_performance.md](06_przewodniki_performance.md) - Optymalizacja wydajności

### API Reference

- [07_api_components.md](07_api_components.md) - Pełne API wszystkich komponentów
- [07_api_hooks.md](07_api_hooks.md) - Hooks i utilities
- [07_api_types.md](07_api_types.md) - TypeScript types i interfaces

---

## Wprowadzenie

Ta dokumentacja opisuje kompletny system komponentów UI dla aplikacji Preact, inspirowany bibliotekami takimi jak Material-UI (MUI) i Ant Design. System zapewnia:

- **Kompletną bibliotekę komponentów** - od podstawowych przycisków po złożone dashboardy
- **Spójny design system** - zunifikowane kolory, typografia, spacing
- **Responsywność** - mobile-first approach
- **Dostępność** - WCAG 2.1 AA compliance
- **TypeScript** - pełne type safety
- **Themability** - łatwa customizacja motywów
- **Performance** - zoptymalizowane komponenty

## Architektura

System jest zbudowany w oparciu o:

- **Preact** - lekka alternatywa dla React
- **Modern SCSS** - @use/@forward zamiast @import
- **CSS Custom Properties** - dla dynamicznych motywów
- **Component Composition** - zamiast deep inheritance
- **Utility-first CSS** - inspirowane Tailwind CSS

## Szybki Start

```bash
npm install @your-org/preact-ui-components
```

```tsx
import { Button, Card, Input } from '@your-org/preact-ui-components';

function App() {
  return (
    <Card>
      <Input placeholder='Enter your name' />
      <Button primary>Submit</Button>
    </Card>
  );
}
```

## Wsparcie

- GitHub Issues: [link]
- Discord: [link]
- Dokumentacja API: [link]
