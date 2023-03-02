import { render } from '@testing-library/react';
import Error from '../Error';

describe('Error', () => {
  it('should render the error message', () => {
    const { getByText } = render(<Error />);
    const errorMessage = getByText(/some unexpected error occured/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render the "Oh no!" title', () => {
    const { getByText } = render(<Error />);
    const title = getByText(/oh no!/i);
    expect(title).toBeInTheDocument();
  });

  it('should have the correct styles', () => {
    const { container } = render(<Error />);
    const errorElement = container.firstChild;
    expect(errorElement).toHaveClass(
      'row-span-2 text-center text-opacity-50 dark:text-opacity-50 text-GPdark2 dark:text-GPlight',
    );
  });
});
