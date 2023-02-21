import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { uiStore } from '../../Stores/UIStore';

import BaseHeader from '../Header';

describe('BaseHeader', () => {
  test('should render header', () => {
    render(<BaseHeader />);
    expect(screen.getByText('GetawayPlan')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('should toggle dark mode', () => {
    render(<BaseHeader />);
    uiStore.setDarkMode(true);
    const toggle = screen.getByRole('checkbox') as HTMLInputElement;
    expect(toggle.checked).toBe(true);

    act(() => {
      userEvent.click(toggle);
    });
    expect(toggle.checked).toBe(false);
  });
});
