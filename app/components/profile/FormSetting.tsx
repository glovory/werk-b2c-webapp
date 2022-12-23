import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
// import { Form } from "@remix-run/react";

import WerkLogo from '~/svg/Werk';
import { enterToClick } from '~/utils/dom';
import fetchData from '~/utils/fetchData';

interface Props {
  inputPhoto?: boolean,
  photo?: object | undefined | any,
  disabled?: boolean,
  register?: any,
  errors?: any,
  cityValue?: any,
  setValue?: (...ops: any) => void,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onChangeFile?: React.ChangeEventHandler<HTMLInputElement>,
}

const COUNTRIES = [
  'Indonesia', // 'Malaysia', 'Thailand', 'Singapore', 'Saudi Arabia', 'Philippines',
];
// const STATES = ['Bali', 'DKI Jakarta', 'East Java', 'Jawa Tengah', 'Jawa Barat', 'Kalimantan Tengah', 'Kalimantan Barat', 'Kalimantan Timur', 'Kalimantan Selatan', 'Kalimantan Utara', 'Madura', 'Yogyakarta'];
// const CITIES = ['Jakarta', 'Malang', 'Surabaya'];

// const EXTERNAL_API = 'http://localhost:3000/data'; // https://api-location.netlify.app

export default function FormSetting({
  inputPhoto,
  photo,
  disabled,
  register,
  errors,
  cityValue = '',
  setValue,
  onSubmit,
  onChangeFile,
}: Props){
  const [openStates, setOpenStates] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);
  const [citiesAndStates, setCitiesAndStates] = useState<any>([]); // All Data
  const [states, setStates] = useState<any>([]); // province options
  const [stateValue, setStateValue] = useState<any>('');
  const [valueCity, setValueCity] = useState<any>(cityValue);
  let loadingBased = openStates && states.length < 1;

  const onOpenGetBased = () => {
    setOpenStates(true);
    if(!states.length){
      fetchData(window.location.origin + '/data/cities.json', {
        mode: 'no-cors',
      })
      .then((res: any) => {
        if(Array.isArray(res)){
          setCitiesAndStates(res); // Store All data
          setStates([ ...new Set(res.map(f => f.province).filter(Boolean)) ]);
        }
      })
      .catch((err: any) => {
        console.log('err: ', err);
      });
    }
  }

  const onOpenCity = () => {
    setOpenCity(true);
  }

  const onChangeStates = (e: any, value: any) => {
    setStateValue(value || '');
    if(valueCity){
      setTimeout(() => {
        setValueCity('');
        setValue?.('city', '');
      }, 1);
    }
  }

  const onChangeCity = (e: any, value: any) => {
    setValueCity(value);
  }

  return (
    <form
      // method="post"
      // encType="multipart/form-data"
      noValidate
      onSubmit={onSubmit}
    >
      <fieldset disabled={disabled} className="min-w-0 p-0 m-0 border-0 text-sm">
        {inputPhoto &&
          <>
            <b>Your Photo</b>
            <p className="mb-4">This will be displayed on your profile.</p>
            <div className="flex items-start">
              {photo ?
                <img
                  className="rounded-full object-cover flex-none"
                  width={80}
                  height={80}
                  alt="Avatar"
                  src={photo.name ? window.URL.createObjectURL(photo) : photo}
                />
                :
                <div className="rounded-full grid place-items-center w-20 h-20 bg-w-blue-1 text-blue-700">
                  <WerkLogo width={40} height={40} />
                </div>
              }

              <div className="ml-4">
                <Button
                  component="label"
                  variant="outlined"
                  disabled={disabled}
                  onKeyDown={enterToClick}
                >
                  Click to Upload
                  <input
                    // {...register("avatar")}
                    hidden
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    disabled={disabled}
                    onChange={onChangeFile}
                  />
                </Button>
                <div className="text-xs mt-2">Use a square image for best results.</div>
              </div>
            </div>

            <hr className="my-6" /> 
          </>
        }

        <label htmlFor="fullName" className="font-semibold w-required">Full Name</label>
        <p className="mb-3">Write your full name.</p>
        <TextField
          {...register("fullName")}
          disabled={disabled}
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
          id="fullName"
          className="w-input-gray"
          required
          fullWidth
          variant="outlined"
          placeholder="Enter your full name"
        />

        <hr className="my-6" />
      
        <label htmlFor="accountName" className="font-semibold w-required">Account Name</label>
        <p className="mb-3">This will also act as your profile URL slug.</p>
        <TextField
          {...register("accountName")}
          disabled={disabled}
          error={!!errors.accountName}
          helperText={errors?.accountName?.message}
          className="w-input-group w-input-gray"
          id="accountName"
          required
          fullWidth
          variant="outlined"
          placeholder="Set your account name"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                component="label"
                htmlFor="accountName"
              >
                https://werk.id/@
              </InputAdornment>
            ),
          }}
        />
        <div className="text-xs mt-2">Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.</div>

        <hr className="my-6" />

        <label htmlFor="headLine" className="font-semibold w-required">Headline</label>
        <p className="mb-3">Write a brief introduction. This will show in talent searches.</p>
        <TextField
          {...register("headLine")}
          disabled={disabled}
          error={!!errors.headLine}
          helperText={errors?.headLine?.message}
          className="w-input-gray"
          id="headLine"
          required
          fullWidth
          placeholder="e.g. I'm an Account Executive based in Jakarta"
        />
        <div className="text-xs mt-2">100 characters.</div>

        <hr className="my-6" />

        <label htmlFor="bio" className="font-semibold">Your Bio</label>
        <p className="mb-3">
          Tell us about yourself so companies know who you are. Sharing more details about yourself and your achievements will help you stand out.
        </p>
        <TextField
          {...register("bio")}
          className="w-input-gray w-multiline"
          id="bio"
          disabled={disabled}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="Write a few sentences about you and your experience..."
        />

        <hr className="my-6" />

        <label htmlFor="country" className="font-semibold w-required">Where are you based?</label>
        <p className="mb-4">Find roles based in your country.</p>
        <Autocomplete
          {...register("country", { value: COUNTRIES[0] })}
          id="country"
          className="w-input-gray w-multiline"
          fullWidth
          disableClearable
          readOnly
          disabled={disabled}
          defaultValue={COUNTRIES[0]}
          options={COUNTRIES}
          renderInput={(props) => (
            <TextField
              {...props}
              name="country"
              error={!!errors.country}
              helperText={errors?.country?.message}
              label="Select Country"
            />
          )}
        />

        {/* {children} */}

        <div className="mt-4">
          <Autocomplete
            {...register("province")}
            id="province"
            className="w-input-gray w-multiline"
            fullWidth
            disableClearable
            disabled={disabled}
            open={openStates}
            loading={loadingBased}
            onChange={onChangeStates}
            onOpen={onOpenGetBased}
            onClose={() => setOpenStates(false)}
            isOptionEqualToValue={(option, value) => option === value}
            options={states} // STATES
            renderInput={(props) => (
              <TextField
                {...props}
                name="province"
                error={!!errors.province}
                // @ts-ignore:next-line
                helperText={errors?.province?.message}
                label="Select Province/States"
                InputProps={{
                  ...props.InputProps,
                  endAdornment: (
                    <>
                      {loadingBased && <CircularProgress color="inherit" size={20} />}
                      {props.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </div>

        <div className="mt-4">
          <Autocomplete
            {...register("city", { value: valueCity })}
            id="city"
            className="w-input-gray w-multiline"
            fullWidth
            disableClearable
            value={valueCity}
            disabled={disabled}
            open={openCity}
            onChange={onChangeCity}
            onOpen={onOpenCity}
            onClose={() => setOpenCity(false)}
            isOptionEqualToValue={(option, value) => option === value} // value !== '' || 
            noOptionsText={stateValue.length ? 'No Options' : 'Please Select Province/States'}
            options={stateValue.length ? citiesAndStates.filter((f: any) => f.province === stateValue).map((val: any) => val.name) : []} // CITIES
            renderInput={(props) => (
              <TextField
                {...props}
                name="city"
                error={!!errors.city}
                // @ts-ignore:next-line
                helperText={errors?.city?.message}
                label="Select City"
              />
            )}
          />
        </div>

        <hr className="my-6" />

        {/*  sticky bottom-0 bg-white border-top py-3 px-6 mt-5 mb-n4 mx-n6 */}
        <div className="text-right">
          <LoadingButton
            size="large"
            variant="contained"
            loading={disabled}
            type="submit"
            className="px-16"
          >
            Save
          </LoadingButton>
        </div>
      </fieldset>
    </form>
  );
}
