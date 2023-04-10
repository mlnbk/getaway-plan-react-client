import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'react-feather';
import { observer } from 'mobx-react-lite';

import { TripCardData } from '@types';

import { uiStore } from '@Stores/UIStore';

const BaseTripCard: FC<TripCardData> = ({
  cardPicture,
  description,
  destinations,
  title,
  id,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('trip-card')) {
      uiStore.setSelectedTrip(id);
    }
  };

  const handleXClick = () => {
    uiStore.setSelectedTrip();
  };

  const handleDelete = () => {
    uiStore.setSelectedTrip(id);
    uiStore.setIsDeleteTripModalOpen(true);
  };

  const handleEdit = () => {
    navigate(`/trips/${id}`);
  };

  const handleImageLoading = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="card break-inside-avoid w-full mb-4 bg-GPmid dark:bg-GPlightGreen shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {uiStore.selectedTrip === id && (
        <div className="modal-box rounded-2xl absolute flex place-content-center h-full w-full scale-100 bg-gray-800 bg-opacity-80 overflow-hidden">
          <button
            className="btn btn-sm btn-circle absolute right-4 top-4"
            onClick={handleXClick}
          >
            ✕
          </button>
          <div className="grid grid-cols-2 gap-6">
            <button
              className="text-rose-700 text-opacity-90"
              onClick={handleDelete}
            >
              <Trash2 className="w-8 h-8" />
            </button>
            <button
              className="text-amber-500 text-opacity-90"
              onClick={handleEdit}
            >
              <Eye className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
      {cardPicture && (
        <figure className="trip-card">
          <img
            className={`trip-card rounded-t-2xl w-full h-full transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100 block' : 'opacity-20'
            }`}
            src={cardPicture}
            alt={title}
            onLoad={handleImageLoading}
          />
        </figure>
      )}
      <div className="trip-card card-body p-4 lg:p-6 text-GPdark2 dark:text-GPlight">
        <h2
          data-testid={'card-title'}
          className="trip-card card-title text-base md:text-lg"
        >
          {title ||
            destinations
              ?.map(
                (destination) =>
                  `${destination.country}${
                    destination.city ? `, ${destination.city}` : ''
                  }`,
              )
              .join(', ')}
        </h2>
        <p
          data-testid={'card-description'}
          className="line-clamp-3 trip-card text-sm md:text-base"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const TripCard = observer(BaseTripCard);

export default TripCard;
