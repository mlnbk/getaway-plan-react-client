import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../Form';
import Input from '../Input';

describe('Form', () => {
  it('should render children', () => {
    const onSubmit = jest.fn();
    render(
      <Form onSubmit={onSubmit}>
        <Input name="test" placeholder="test" icon={<div>Icon</div>} />
      </Form>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('should submit the form when submit button is clicked', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Form onSubmit={onSubmit}>
        <Input name="test" placeholder="test" />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </Form>,
    );

    fireEvent.click(getByTestId('submit-button'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});
