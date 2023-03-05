import { render, screen } from '@testing-library/react';

import TripCard from '@Components/Specific/TripCard';
import { TripCardData } from '@types';

describe('TripCard', () => {
  const cardData: TripCardData = {
    cardPicture: 'https://example.com/picture.jpg',
    description: 'A test trip description',
    destinations: [{ country: 'Test Country', city: 'Test City' }],
    title: 'Test Trip',
  };

  it('should render the title and description', () => {
    render(<TripCard {...cardData} />);
    const titleElement = screen.getByText(/test trip/i, {
      selector: '.card-title',
    });
    const descriptionElement = screen.queryByTestId('card-description');
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(/a test trip description/i);
  });

  it('should render the destination as the title if no title is provided', () => {
    const { title, ...dataWithoutTitle } = cardData;
    render(<TripCard {...dataWithoutTitle} />);
    const titleElement = screen.getByText(/test city/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the card picture if provided', () => {
    render(<TripCard {...cardData} />);
    const pictureElement = screen.getByAltText(/test trip/i);
    expect(pictureElement).toHaveAttribute(
      'src',
      'https://example.com/picture.jpg',
    );
  });
});
