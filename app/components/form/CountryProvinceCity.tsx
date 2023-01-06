import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
//
import fetchData from '~/utils/fetchData';

const COUNTRIES = [
  'Indonesia', // 'Malaysia', 'Thailand', 'Singapore', 'Saudi Arabia', 'Philippines',
];
// const EXTERNAL_API = 'http://localhost:3000/data'; // https://api-location.netlify.app

export default function CountryProvinceCity({
  disabled,
  register,
  errors,
  provinceValue,
  cityValue,
  setValue,
  clearErrors,
  onChangeProvince,
  onChangeCity,
}: any){
  const [openStates, setOpenStates] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);
  const [citiesAndStates, setCitiesAndStates] = useState<any>([]); // All Data
  const [states, setStates] = useState<any>([]); // province options
  let loadingBased = (openStates || openCity) && states.length < 1;

  const fetchOptions = () => {
    if(!states.length){
      // window.location.origin + '/data/cities.json' | 'https://api-location.netlify.app/id/cities.min.json'
      fetchData('/data/cities.json', {
        // responseType: 'text',
        mode: 'no-cors', // no-cors | cors
      })
      .then((res: any) => {
        if(Array.isArray(res)){
          setCitiesAndStates(res); // Store All data
          setStates([ ...new Set(res.map(f => f.province).filter(Boolean)) ]);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
    }
  }

  const onOpenGetBased = () => {
    setOpenStates(true);
    fetchOptions();
  }

  const onChangeStates = (e: any, val: any) => {
    onChangeProvince?.(val);

    if(errors.province){
      clearErrors('province');
    }
    if(errors.city){
      clearErrors('city');
    }

    setTimeout(() => {
      onChangeCity?.(null);
      setValue?.('city', null);
    }, 1);
  }

  const onOpenCity = () => {
    setOpenCity(true);
    if(provinceValue && cityValue){
      fetchOptions();
    }
  }

  const doChangeCity = (e: any, val: any) => {
    onChangeCity?.(val);
    if(errors.city){
      clearErrors('city');
    }
  }

  const getCityByProvince = () => citiesAndStates.filter((f: any) => f.province === provinceValue);

  return (
    <>
      <Autocomplete
        {...register("country", { value: COUNTRIES[0] })}
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
            required
            name="country"
            error={!!errors.country}
            helperText={errors?.country?.message}
            label="Select Country"
          />
        )}
      />

      <Autocomplete
        {...register("province", { value: provinceValue })}
        className="w-input-gray w-multiline mt-4"
        fullWidth
        disableClearable
        disabled={disabled}
        open={openStates}
        loading={!openCity && loadingBased}
        value={provinceValue}
        onChange={onChangeStates}
        onOpen={onOpenGetBased}
        onClose={() => setOpenStates(false)}
        isOptionEqualToValue={(option, value) => option === value}
        options={states}
        renderInput={(props) => (
          <TextField
            {...props}
            required
            name="province"
            error={!!errors.province}
            // @ts-ignore:next-line
            helperText={errors?.province?.message}
            label="Select Province/States"
            InputProps={{
              ...props.InputProps,
              endAdornment: (
                <>
                  {(!openCity && loadingBased) && <CircularProgress color="inherit" size={20} />}
                  {props.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {provinceValue &&
        <Autocomplete
          {...register("city", { value: cityValue })}
          className="w-input-gray w-multiline mt-4"
          fullWidth
          disableClearable
          disabled={disabled}
          open={openCity}
          loading={openCity && loadingBased}
          value={cityValue}
          onChange={doChangeCity}
          onOpen={onOpenCity}
          onClose={() => setOpenCity(false)}
          isOptionEqualToValue={(option, value) => !(option !== value && !!getCityByProvince().find((f: any) => f.name === value))}
          // noOptionsText={provinceValue ? 'No Options' : 'Please Select Province/States'}
          options={getCityByProvince().map((f: any) => f.name)}
          renderInput={(props) => (
            <TextField
              {...props}
              required
              name="city"
              error={!!errors.city}
              // @ts-ignore:next-line
              helperText={errors?.city?.message}
              label="Select City"
              InputProps={{
                ...props.InputProps,
                endAdornment: (
                  <>
                    {(openCity && loadingBased) && <CircularProgress color="inherit" size={20} />}
                    {props.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      }
    </>
  );
}
