import { render } from '@testing-library/react';

import { upcomingTrips } from '../../mockData';

import Home from '../Home';

test('renders trip cards', () => {
  const { getByText } = render(<Home />);

  // Check that each trip card title is present in the DOM
  for (const { destination } of upcomingTrips) {
    const titleElement = getByText(destination);
    expect(titleElement).toBeInTheDocument();
  }
});
