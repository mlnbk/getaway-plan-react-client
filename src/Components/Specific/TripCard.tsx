import { FC } from 'react';

import { TripCardData } from '@types';

const TripCard: FC<TripCardData> = ({
  cardPicture,
  description,
  destinations,
  title,
}) => {
  return (
    <div className="card w-full bg-GPmid dark:bg-GPlightGreen shadow-xl">
      {cardPicture && (
        <figure>
          <img src={cardPicture} alt={title} />
        </figure>
      )}
      <div className="card-body text-GPdark2 dark:text-GPlight">
        <h2 data-testid={'card-title'} className="card-title">
          {title ??
            destinations
              ?.map(
                (destination) => destination.country + ', ' + destination.city,
              )
              .join(', ')}
        </h2>
        <p data-testid={'card-description'} className="line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
