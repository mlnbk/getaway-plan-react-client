import { FC } from 'react';

const Error: FC = () => {
  return (
    <div
      className="
        row-span-2
        text-center
        text-opacity-50 dark:text-opacity-50 text-GPdark2 dark:text-GPlight"
    >
      <div className="text-4xl pb-4">Oh no!</div>
      <div>
        Some unexpected error occured, <br className="block md:hidden" /> please
        reload the page and try again.
      </div>
    </div>
  );
};

export default Error;
