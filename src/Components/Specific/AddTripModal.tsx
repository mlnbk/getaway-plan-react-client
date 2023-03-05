import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

import Modal from '@Components/Generic/Modal';
import Input from '@Components/Generic/Input';
import Button from '@Components/Generic/Button';
import Form from '@Components/Generic/Form';
import { queryClient } from 'index';

const BaseAddTripModal: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const addTripResult = await tripStore.addTrip({
      name: data.tripName,
      description: data.tripDescription,
      destinations: [{ country: 'Austria', city: 'Klagenfurt' }],
    });
    if (addTripResult) {
      toast.success('Trip successfully added!');
      uiStore.setIsAddTripModalOpen(false);
    } else {
      toast.error(
        'There was an error creating your new trip. Please try again!',
      );
    }
    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: ['trips'] });
  };

  return (
    <Modal
      title={'Add new trip'}
      isOpen={uiStore.isAddTripModalOpen}
      onClose={() => uiStore.setIsAddTripModalOpen(false)}
    >
      {isLoading ? (
        <ClipLoader
          data-testid="loader"
          color={uiStore.spinnerColor}
          className="justify-center justify-self-center"
        />
      ) : (
        <Form onSubmit={onSubmit}>
          <p>Name</p>
          <Input
            name="tripName"
            placeholder={'Type the name your new trip...'}
          />
          <p>Description</p>
          <Input
            name="tripDescription"
            placeholder={'Type the description your new trip...'}
          />
          <Button
            label={'Add trip'}
            type={'submit'}
            className={'justify-self-center self-center'}
          />
        </Form>
      )}
    </Modal>
  );
};

const AddTripModal = observer(BaseAddTripModal);
export default AddTripModal;
