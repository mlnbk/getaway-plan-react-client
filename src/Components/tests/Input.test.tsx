import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GitHub } from 'react-feather';

import Input from '@Components/Generic/Input';

describe('Input component', () => {
  it('renders an input with an icon', () => {
    render(<Input name="test" icon={<GitHub />} />);
    const input = screen.getByTestId('textbox');
    const icon = screen.getByTestId('icon');
    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('calls the register function when input is changed', () => {
    const registerMock = jest.fn();
    render(<Input name="test" register={registerMock} />);
    const input = screen.getByTestId('textbox');
    userEvent.type(input, 'hello');
    expect(registerMock).toHaveBeenCalledWith('test');
  });

  it('renders the correct input type', () => {
    render(<Input name="test" type="password" />);
    const input = screen.getByTestId('textbox');
    expect(input).toHaveAttribute('type', 'password');
  });
});
