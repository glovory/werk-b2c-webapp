import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
//
import fetchData from '~/utils/fetchData';

const COUNTRIES = [
  'Indonesia', // 'Malaysia', 'Thailand', 'Singapore', 'Saudi Arabia', 'Philippines',
];
// const STATES = ['Bali', 'DKI Jakarta', 'East Java', 'Jawa Tengah', 'Jawa Barat', 'Kalimantan Tengah', 'Kalimantan Barat', 'Kalimantan Timur', 'Kalimantan Selatan', 'Kalimantan Utara', 'Madura', 'Yogyakarta'];
// const CITIES = ['Jakarta', 'Malang', 'Surabaya'];
// const EXTERNAL_API = 'http://localhost:3000/data'; // https://api-location.netlify.app

export default function CountryProvinceCity({
  disabled,
  register,
  errors,
  provinceValue,
  cityValue,
  setValue,
  onChangeProvince,
  onChangeCity,
}: any){
  const [openStates, setOpenStates] = useState<boolean>(false);
  const [citiesAndStates, setCitiesAndStates] = useState<any>([]); // All Data
  const [states, setStates] = useState<any>([]); // province options
  let loadingBased = openStates && states.length < 1;

  const onOpenGetBased = () => {
    setOpenStates(true);
    if(!states.length){
      // window.location.origin + '/data/cities.json' | 'https://api-location.netlify.app/id/cities.min.json'
      fetchData(window.location.origin + '/data/cities.json', {
        // responseType: 'text',
        mode: 'no-cors', // no-cors | cors
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

  const onChangeStates = (e: any, value: any) => {
    onChangeProvince?.(value);
    if(cityValue){
      setTimeout(() => {
        onChangeCity?.(null);
        setValue?.('city', null);
      }, 1);
    }
  }

  const doChangeCity = (e: any, value: any) => {
    onChangeCity?.(value);
  }

  return (
    <>
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

      <Autocomplete
        {...register("province")}
        id="province"
        className="w-input-gray w-multiline mt-4"
        fullWidth
        disableClearable
        disabled={disabled}
        open={openStates}
        loading={loadingBased}
        value={provinceValue}
        onChange={onChangeStates}
        onOpen={onOpenGetBased}
        onClose={() => setOpenStates(false)}
        isOptionEqualToValue={(option, value) => option === value}
        options={states}
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

      <Autocomplete
        {...register("city", { value: cityValue })}
        id="city"
        className="w-input-gray w-multiline mt-4"
        fullWidth
        disableClearable
        disabled={disabled}
        value={cityValue}
        onChange={doChangeCity}
        isOptionEqualToValue={(option, value) => option === value} // value !== '' || 
        noOptionsText={provinceValue ? 'No Options' : 'Please Select Province/States'}
        options={provinceValue ? citiesAndStates.filter((f: any) => f.province === provinceValue).map((val: any) => val.name) : []} // CITIES
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
    </>
  );
}
