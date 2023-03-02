import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import BaseHeader from '../Header';
const queryClient = new QueryClient();

describe('BaseHeader', () => {
  test('should render header', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BaseHeader />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
