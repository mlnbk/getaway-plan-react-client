import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders app name', () => {
  render(<App />);
  const linkElement = screen.getByText(/getawayplan/i);
  expect(linkElement).toBeInTheDocument();
});
