import { FC } from 'react';

import { TripCardData } from '../constants';

const TripCard: FC<TripCardData> = ({
  cardPicture,
  description,
  destination,
  title,
}) => {
  return (
    <div className="card w-full bg-GPmid1 dark:bg-GPmid2 shadow-xl">
      {cardPicture && (
        <figure>
          <img src={cardPicture} alt={title} />
        </figure>
      )}
      <div className="card-body text-GPdark2 dark:text-GPlight">
        <h2 data-testid={'card-title'} className="card-title">
          {title ?? destination}
        </h2>
        <p data-testid={'card-description'} className="line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
