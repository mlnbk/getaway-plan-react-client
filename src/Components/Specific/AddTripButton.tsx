import { FC } from 'react';
import { Plus } from 'react-feather';

import { uiStore } from '@Stores/UIStore';

const AddTripButton: FC = () => {
  return (
    <button
      data-testid={'add-trip-mode-button'}
      onClick={() => uiStore.setIsAddTripModalOpen(true)}
      className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 ease-in-out"
    >
      <div className="avatar">
        <Plus className="bg-GPdarkGreen dark:bg-GPdarkBrown text-GPlightBrown dark:text-GPlight w-10 h-10 p-2 rounded-full shadow-lg" />
      </div>
    </button>
  );
};

export default AddTripButton;
