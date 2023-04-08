import { FC } from 'react';

interface CardProperties {
  title: string;
  description?: string;
  className?: string;
}

const Card: FC<CardProperties> = ({ className, title, description }) => {
  return (
    <div
      className={`card ${className} break-inside-avoid w-full mb-4 bg-GPmid dark:bg-GPlightGreen shadow-xl`}
    >
      <div className="card-body p-4 lg:p-6 text-GPdark2 dark:text-GPlight">
        <h2
          data-testid={'card-title'}
          className="card-title text-base md:text-lg"
        >
          {title}
        </h2>
        {description && (
          <p data-testid={'card-description'} className="text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
