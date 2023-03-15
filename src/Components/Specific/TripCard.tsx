import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'react-feather';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import { queryClient } from 'index';

import { TripCardData } from '@types';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

const TripCard: FC<TripCardData> = ({
  cardPicture,
  description,
  destinations,
  title,
  id,
}) => {
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('trip-card')) {
      setSelected((previousState) => !previousState);
    }
  };

  const handleXClick = () => {
    setSelected(false);
  };

  const handleDelete = async (tripId: string) => {
    setIsLoading(true);
    const deleteTripResult = await tripStore.deleteTrip(tripId);
    if (deleteTripResult?.ok) {
      toast.success('Trip successfully deleted!');
      uiStore.setIsAddTripModalOpen(false);
    } else {
      toast.error('There was an error deleting your trip. Please try again!');
    }
    queryClient.invalidateQueries({ queryKey: ['trips'] });
    setIsLoading(false);
  };

  const handleEdit = (tripId: string) => {
    navigate(`/trips/${tripId}`);
  };

  const handleImageLoading = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="card break-inside-avoid w-full mb-4 bg-GPmid dark:bg-GPlightGreen shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {selected && (
        <div className="modal-box rounded-2xl absolute flex place-content-center h-full w-full scale-100 bg-gray-800 bg-opacity-80 overflow-hidden transition-all duration-300 ease-in-out">
          <button
            className="btn btn-sm btn-circle absolute right-4 top-4"
            onClick={handleXClick}
            disabled={isLoading}
          >
            ✕
          </button>
          {isLoading ? (
            <ClipLoader
              data-testid="loader"
              color={uiStore.spinnerColor}
              className="place-self-center"
            />
          ) : (
            <div className="grid grid-cols-2 gap-8">
              <button
                className="text-rose-700 text-opacity-90"
                onClick={() => handleDelete(id)}
              >
                <Trash2 className="w-10 h-10" />
              </button>
              <button
                className="text-amber-500 text-opacity-90"
                onClick={() => handleEdit(id)}
              >
                <Edit className="w-10 h-10" />
              </button>
            </div>
          )}
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

export default TripCard;
