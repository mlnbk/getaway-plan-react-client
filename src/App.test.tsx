import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { uiStore } from './Stores/UIStore';

import App from './App';

const queryClient = new QueryClient();

test('Renders app name', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
  const linkElement = screen.getByText(/getawayplan/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  test('renders the header, home page, and footer', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const home = screen.getByTestId('home-page');
    expect(home).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('applies dark mode when enabled', () => {
    uiStore.setDarkMode(true);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const app = screen.getByTestId('app');
    expect(app).toHaveClass('dark');
  });

  test('does not apply dark mode when disabled', () => {
    uiStore.setDarkMode(false);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const app = screen.getByTestId('app');
    expect(app).not.toHaveClass('dark');
  });
});
