import { render } from '@testing-library/react';

import Footer from '../Footer';

describe('Footer component', () => {
  test('renders the correct text', () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/© 2023/)).toBeInTheDocument();
    expect(getByText(/mlnbk/)).toHaveAttribute(
      'href',
      'https://github.com/mlnbk/getaway-plan-react-client',
    );
    expect(getByText(/About/)).toHaveAttribute('href', '#');
    expect(getByText(/Privacy Policy/)).toHaveAttribute('href', '#');
    expect(getByText(/Contact/)).toHaveAttribute('href', '#');
  });
});
