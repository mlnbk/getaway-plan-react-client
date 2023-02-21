import { FC } from 'react';

import { TripCardData } from '../constants';

const TripCard: FC<TripCardData> = ({
  cardPicture,
  description,
  destination,
  title,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      {cardPicture && (
        <figure>
          <img src={cardPicture} alt={title} />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title ?? destination}</h2>
        <p className="line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default TripCard;
