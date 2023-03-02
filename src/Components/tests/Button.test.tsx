import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  test('renders button with correct label', () => {
    const label = 'Click me';
    render(<Button label={label} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
  });

  test('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    const label = 'Click me';
    render(<Button label={label} onClick={handleClick} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  test('button is disabled when disabled prop is true', () => {
    const label = 'Click me';
    render(<Button label={label} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renders button with correct type', () => {
    const label = 'Click me';
    const type = 'submit';
    render(<Button label={label} type={type} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', type);
  });

  test('renders button with custom class name', () => {
    const label = 'Click me';
    const className = 'custom-class';
    render(<Button label={label} className={className} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(className);
  });
});
