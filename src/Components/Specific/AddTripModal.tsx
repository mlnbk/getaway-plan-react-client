import { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { Controller, useForm } from 'react-hook-form';
import { FileRejection, useDropzone } from 'react-dropzone';
import CurrencyInput from 'react-currency-input-field';
import { useQuery } from 'react-query';

import { queryClient } from 'index';

import { currencyPrefix } from '../../constants';
import {
  Budget,
  City,
  Country,
  limitDecimals,
  omitUndefinedProperties,
  Trip,
} from '@types';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

import Button from '@Components/Generic/Button';
import Input from '@Components/Generic/Input';
import Modal from '@Components/Generic/Modal';
import StyledSelect from '@Components/Generic/Select';

interface AddressValues {
  country: { label?: string; code?: string };
  city?: string;
}

interface FormValues {
  name?: string;
  description?: string;
  country: string;
  city: string;
  pictures?: any;
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
  const [isLoading, setIsLoading] = useState(false);
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [countries, setCountries] = useState<Country[]>();
  const [cities, setCities] = useState<City[]>();
  const { isFetching: isFetchingCountries } = useQuery(
    'countries',
    async () => {
      const countries = await tripStore.getCountries();
      setCountries(countries);
    },
  );

  const handleClose = () => {
    uiStore.setIsAddTripModalOpen(false);
    setAddressValues({
      country: { label: undefined, code: undefined },
      city: undefined,
    });
    reset();
    removeAllPictures();
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles],
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      toast.error(rejectedFiles[0].errors[0].message);
    },
    [myFiles],
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
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAllPictures = () => {
    setMyFiles([]);
  };

  const files = myFiles.map((file) => (
    <li key={file.name} className="flex justify-between">
      <p>{file.name}</p>
      <button className="btn btn-xs btn-circle" onClick={removeFile(file)}>
        ✕
      </button>
    </li>
  ));

  const updatedCountries = countries?.map((country) => ({
    label: country.name,
    value: country.code,
    ...country,
  }));
  const updatedCities = cities?.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const { budget, name, description, country, city } = data;
    const formData = new FormData();
    const tripInfo = omitUndefinedProperties<Omit<Trip, '_id'>>({
      name,
      description,
      destinations: [{ country, city }],
    });
    const isBudgetDefined = Object.values(budget).some(
      (property) => property !== undefined,
    );
    const { accomodation, activities, food, transportation } = budget;
    if (isBudgetDefined) {
      tripInfo.budget = {
        accomodation: accomodation ? limitDecimals(accomodation) : '0.00',
        activities: activities ? limitDecimals(activities) : '0.00',
        food: food ? limitDecimals(food) : '0.00',
        transportation: transportation ? limitDecimals(transportation) : '0.00',
        total: calculateTotal()?.toFixed(2),
      };
    }
    formData.append('tripInfo', JSON.stringify(tripInfo));
    formData.append('tripPic', myFiles[0]);
    const addTripResult = await tripStore.addTrip(formData);
    if (addTripResult) {
      toast.success('Trip successfully added!');
      uiStore.setIsAddTripModalOpen(false);
    } else {
      toast.error(
        'There was an error creating your new trip. Please try again!',
      );
    }
    setAddressValues({
      country: { label: undefined, code: undefined },
      city: undefined,
    });
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

  useEffect(() => {
    setCities([]);
    if (!addressValues?.country?.code) return;
    const fetchCitiesForCountry = async () => {
      const getCitiesResult = await tripStore.getCitiesForCountry(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        addressValues.country.code!,
      );
      setCities(() => getCitiesResult);
    };
    fetchCitiesForCountry();
  }, [addressValues?.country]);

  return (
    <Modal
      title={'Add new trip'}
      isOpen={uiStore.isAddTripModalOpen}
      onClose={handleClose}
    >
      {isLoading || isFetchingCountries ? (
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
                <ul>{files}</ul>
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
          <Controller
            name={'country'}
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field: { onChange } }) => {
              return (
                <>
                  <StyledSelect
                    label="Country"
                    name="country"
                    placeholder="Pick a country"
                    options={updatedCountries}
                    value={
                      addressValues?.country.label &&
                      addressValues?.country.code
                        ? {
                            label: addressValues.country.label,
                            value: addressValues.country.code,
                          }
                        : undefined
                    }
                    onChange={(newValue) => (
                      setAddressValues(() => ({
                        country: {
                          label: newValue?.label,
                          code: newValue?.value,
                        },
                        city: undefined,
                      })),
                      onChange(newValue?.label)
                    )}
                  />
                  {errors.country && (
                    <p className="text-sm text-rose-500 -mt-4">
                      {errors.country.message}
                    </p>
                  )}
                </>
              );
            }}
          />
          <Controller
            name={'city'}
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field: { onChange } }) => {
              return (
                <>
                  <StyledSelect
                    key={`${Math.random() * 1000}`}
                    label="City"
                    name="city"
                    placeholder="Pick a city in the selected country"
                    options={updatedCities}
                    value={
                      addressValues?.city && addressValues?.city !== ''
                        ? {
                            label: addressValues.city,
                            value: addressValues.city,
                          }
                        : undefined
                    }
                    onChange={(newValue) => (
                      setAddressValues((previousAddressValues) => ({
                        country: {
                          label: previousAddressValues?.country.label,
                          code: previousAddressValues?.country.code,
                        },
                        city: newValue?.label,
                      })),
                      onChange(newValue?.label)
                    )}
                  />
                  {errors.city && (
                    <p className="text-sm text-rose-500 -mt-4">
                      {errors.city.message}
                    </p>
                  )}
                </>
              );
            }}
          />
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
                    className="w-full h-full p-2
                      border
                      text-sm
                      focus:text-GPdark2
                      dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
                      dark:bg-opacity-0
                      border-GPdark dark:border-GPlight
                      bg-GPmid dark:bg-GPmid2
                      rounded-md outline-none
                      transition duration-150 ease-in-out"
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
                    className="w-full h-full p-2
                  border
                  text-sm
                  focus:text-GPdark2
                  dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
                  dark:bg-opacity-0
                  border-GPdark dark:border-GPlight
                  bg-GPmid dark:bg-GPmid2
                  rounded-md outline-none
                  transition duration-150 ease-in-out"
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
                    className="w-full h-full p-2
                border
                text-sm
                focus:text-GPdark2
                dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
                dark:bg-opacity-0
                border-GPdark dark:border-GPlight
                bg-GPmid dark:bg-GPmid2
                rounded-md outline-none
                transition duration-150 ease-in-out"
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
                    className="w-full h-full p-2
                  border
                  text-sm
                  focus:text-GPdark2
                  dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
                  dark:bg-opacity-0
                  border-GPdark dark:border-GPlight
                  bg-GPmid dark:bg-GPmid2
                  rounded-md outline-none
                  transition duration-150 ease-in-out"
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
