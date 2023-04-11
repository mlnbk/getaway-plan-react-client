import { FC, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { Controller, useForm } from 'react-hook-form';
import { FileRejection, useDropzone } from 'react-dropzone';
import CurrencyInput from 'react-currency-input-field';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';

import { queryClient } from 'index';

import { currencyPrefix, googleMapsLibraries } from '../../constants';
import { AddTripParameters, Budget, omitUndefinedProperties } from '@types';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

import Button from '@Components/Generic/Button';
import Input from '@Components/Generic/Input';
import Modal from '@Components/Generic/Modal';

interface AddressValues {
  country?: string;
  city?: string;
  imageUrl?: string;
}

interface FormValues {
  name?: string;
  description?: string;
  location: {
    country: string;
    city: string;
  };
  budget: Budget;
}

const BaseAddTripModal: FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });
  const [addressValues, setAddressValues] = useState<AddressValues>();
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: googleMapsLibraries as any,
  });

  const handleClose = () => {
    uiStore.setIsAddTripModalOpen(false);
    setAddressValues(undefined);
    reset();
    removeAllPictures();
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files],
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      toast.error(rejectedFiles[0].errors[0].message);
    },
    [files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const removeFile = (file: File) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAllPictures = () => {
    setFiles([]);
  };

  const onSubmit = async (data: FormValues) => {
    if (!addressValues || !addressValues.country || !addressValues.city) return;
    setIsLoading(true);
    const { budget, name, description } = data;
    const { city, country, imageUrl } = addressValues;
    const formData = new FormData();
    const tripInfo = omitUndefinedProperties<AddTripParameters>({
      name,
      description,
      destinations: [{ country, city }],
    });
    const isBudgetDefined = Object.values(budget).some(
      (property) => property !== undefined,
    );
    const { accomodation, activities, food, transportation } = budget;
    if (isBudgetDefined) {
      tripInfo.budget = tripStore.calculateTripBudget({
        accomodation,
        activities,
        food,
        transportation,
        total: calculateTotal().toFixed(2),
      });
    }
    if (files.length > 0) {
      formData.append('tripPic', files[0]);
    } else if (imageUrl) {
      tripInfo.tripPic = imageUrl;
    }
    formData.append('tripInfo', JSON.stringify(tripInfo));
    const addTripResult = await tripStore.addTrip(formData);
    if (addTripResult) {
      toast.success('Trip successfully added!');
      uiStore.setIsAddTripModalOpen(false);
    } else {
      toast.error(
        'There was an error creating your new trip. Please try again!',
      );
    }
    setAddressValues(undefined);
    reset();
    removeAllPictures();
    queryClient.invalidateQueries({ queryKey: ['trips'] });
    setIsLoading(false);
  };

  const calculateTotal = () => {
    const values = watch('budget');
    if (!values) return 0;
    return Object.values(values)
      .filter((value) => typeof value === 'string')
      .reduce(
        (accumulator: number, current: string) =>
          Number(accumulator) + Number(current),
        0,
      );
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const { address_components, photos } = place;
      if (!address_components) {
        toast.error(
          "There's been an error while extracting the location data!",
        );
        return;
      }
      const city = address_components.find((component) =>
        component.types.includes('locality'),
      )?.long_name;
      const country = address_components.find((component) =>
        component.types.includes('country'),
      )?.long_name;
      if (!city || !country) {
        toast.error(
          "There's been an error while extracting the location data!",
        );
        return;
      }
      const imageUrl = photos
        ? photos[Math.floor(Math.random() * photos.length)].getUrl()
        : undefined;
      setAddressValues({ city, country, imageUrl });
    }
  };

  const displayedFiles = files.map((file) => (
    <li key={file.name} className="flex justify-between">
      <p>{file.name}</p>
      <button className="btn btn-xs btn-circle" onClick={removeFile(file)}>
        ✕
      </button>
    </li>
  ));

  return (
    <Modal
      title={'Add new trip'}
      isOpen={uiStore.isAddTripModalOpen}
      onClose={handleClose}
    >
      {isLoading ? (
        <div className="grid">
          <ClipLoader
            data-testid="loader"
            color={uiStore.spinnerColor}
            className="justify-center justify-self-center"
          />
        </div>
      ) : (
        <form
          className="grid max-w-md mx-auto mt-8 mb-0 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Trip picture</p>
          <section>
            <div
              className="
                p-2 mb-4
                dropzone
                container border
                text-sm
                focus:text-GPdark2
                dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
                dark:bg-opacity-0
                border-GPdark dark:border-GPlight
                bg-GPmid dark:bg-GPmid2
                rounded-md outline-none"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="text-[#999]">
                Drag 'n' drop a picture here, or click to select a file
              </p>
            </div>
            {files.length > 0 && (
              <aside>
                <h4 className="font-bold">File</h4>
                <ul>{displayedFiles}</ul>
              </aside>
            )}
            {files.length > 0 && (
              <button
                className="btn btn-xs btn-outline btn-error my-3"
                onClick={removeAllPictures}
              >
                Remove
              </button>
            )}
          </section>
          <Input
            label="Name"
            optional={true}
            register={() =>
              register('name', {
                maxLength: {
                  value: 40,
                  message: 'Name must be less than 40 characters',
                },
              })
            }
            name="name"
            placeholder={'Type the name your new trip...'}
          />
          {errors.name && (
            <p className="text-sm text-rose-500 -mt-6">{errors.name.message}</p>
          )}
          <Input
            register={() => register('description')}
            name="description"
            label="Description"
            optional={true}
            isTextArea
            placeholder={'Type the description your new trip...'}
          />
          {isLoaded ? (
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              options={{ types: ['(cities)'] }}
            >
              <div className="mb-4">
                <p className="pb-2">Destination</p>
                <input
                  type="text"
                  placeholder="Start typing to chose a location..."
                  {...register('location')}
                  className="addTripInput"
                />
              </div>
            </Autocomplete>
          ) : (
            <></>
          )}
          <p>Budget</p>
          <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-12 items-center">
            <p className="col-start-1">Accomodation</p>
            <Controller
              name={'budget.accomodation'}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <CurrencyInput
                    id="accomodation"
                    name="accomodation"
                    placeholder="Please enter a number"
                    decimalsLimit={2}
                    prefix={currencyPrefix}
                    onValueChange={(value) => onChange(value)}
                    className="addTripInput"
                  />
                );
              }}
            />
            <p className="col-start-1">Activities</p>
            <Controller
              name={'budget.activities'}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <CurrencyInput
                    id="activities"
                    name="activities"
                    placeholder="Please enter a number"
                    decimalsLimit={2}
                    prefix={currencyPrefix}
                    onValueChange={(value) => onChange(value)}
                    className="addTripInput"
                  />
                );
              }}
            />
            <p className="col-start-1">Food</p>
            <Controller
              name={'budget.food'}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <CurrencyInput
                    id="food"
                    name="food"
                    placeholder="Please enter a number"
                    decimalsLimit={2}
                    prefix={currencyPrefix}
                    onValueChange={(value) => onChange(value)}
                    className="addTripInput"
                  />
                );
              }}
            />
            <p className="col-start-1">Transportation</p>
            <Controller
              name={'budget.transportation'}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <CurrencyInput
                    id="transportation"
                    name="transportation"
                    placeholder="Please enter a number"
                    decimalsLimit={2}
                    prefix={currencyPrefix}
                    onValueChange={(value) => onChange(value)}
                    className="addTripInput"
                  />
                );
              }}
            />
            <p className="col-start-1">Total</p>
            <p className="col-start-2 font-bold">
              {currencyPrefix} {calculateTotal()?.toFixed(2)}
            </p>
          </div>
          <Button
            label="Add trip"
            type="submit"
            className="justify-self-center self-center w-40 mt-4"
          />
        </form>
      )}
    </Modal>
  );
};

const AddTripModal = observer(BaseAddTripModal);
export default AddTripModal;
