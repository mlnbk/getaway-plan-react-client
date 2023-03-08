import { FC, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { Country, City } from 'country-state-city';
import { Controller, useForm } from 'react-hook-form';
import Dropzone, { useDropzone } from 'react-dropzone';

import { queryClient } from 'index';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

import Button from '@Components/Generic/Button';
import Input from '@Components/Generic/Input';
import Modal from '@Components/Generic/Modal';
import StyledSelect from '@Components/Generic/Select';
import { X } from 'react-feather';

interface AddressValues {
  country: { label?: string; isoCode?: string };
  city?: string;
}

interface FormValues {
  name?: string;
  description?: string;
  country: string;
  city: string;
}

const BaseAddTripModal: FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });
  const [isLoading, setIsLoading] = useState(false);
  const [addressValues, setAddressValues] = useState<AddressValues>();
  const countries = Country.getAllCountries();
  const [myFiles, setMyFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removeFile = (file: File) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
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

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updatedCities = (countryCode: string) =>
    City.getCitiesOfCountry(countryCode)?.map((city) => ({
      label: city.name,
      value: city.name,
    }));

  const onSubmit = async (data: FormValues) => {
    const { name, description, country, city } = data;
    setIsLoading(true);
    const addTripResult = await tripStore.addTrip({
      name,
      description,
      destinations: [{ country, city }],
    });
    if (addTripResult) {
      toast.success('Trip successfully added!');
      uiStore.setIsAddTripModalOpen(false);
    } else {
      toast.error(
        'There was an error creating your new trip. Please try again!',
      );
    }
    setAddressValues({
      country: { label: undefined, isoCode: undefined },
      city: undefined,
    });
    reset();
    queryClient.invalidateQueries({ queryKey: ['trips'] });
    setIsLoading(false);
  };

  return (
    <Modal
      title={'Add new trip'}
      isOpen={uiStore.isAddTripModalOpen}
      onClose={() => uiStore.setIsAddTripModalOpen(false)}
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
          <section>
            <div
              className="
                p-2 my-2
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
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
            {files.length > 0 && (
              <aside>
                <h4 className="font-bold">Files</h4>
                <ul>{files}</ul>
              </aside>
            )}
            {files.length > 0 && (
              <button
                className="btn btn-xs btn-outline btn-error my-3"
                onClick={removeAll}
              >
                Remove All
              </button>
            )}
          </section>
          <p>Name</p>
          <Input
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
          <p>Description</p>
          <Input
            register={() => register('description')}
            name="description"
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
                      addressValues?.country.isoCode
                        ? {
                            label: addressValues.country.label,
                            value: addressValues.country.isoCode,
                          }
                        : undefined
                    }
                    onChange={(newValue) => (
                      setAddressValues(() => ({
                        country: {
                          label: newValue?.label,
                          isoCode: newValue?.value,
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
                    options={updatedCities(
                      addressValues?.country?.isoCode ?? '',
                    )}
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
                          isoCode: previousAddressValues?.country.isoCode,
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
          <Button
            label={'Add trip'}
            type={'submit'}
            className={'justify-self-center self-center mt-4'}
          />
        </form>
      )}
    </Modal>
  );
};

const AddTripModal = observer(BaseAddTripModal);
export default AddTripModal;
