import type { ReactNode } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';

import { enterToClick } from '~/utils/dom';

interface Props {
  photo?: object | undefined | any,
  disabled?: boolean,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onChangeFile?: React.ChangeEventHandler<HTMLInputElement>,
  children?: ReactNode,
}

const COUNTRIES = [
  'Indonesia', 'Malaysia', 'Thailand', 'Singapore', 'Saudi Arabia', 'Philippines',
];

export default function FormSetting({
  photo,
  disabled,
  onSubmit,
  onChangeFile,
  children,
}: Props){
  return (
    <form
      noValidate
      onSubmit={onSubmit}
    >
      <fieldset disabled={disabled} className="min-w-0 p-0 m-0 border-0 text-sm">
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
            <div
              className="rounded-full grid place-items-center w-20 h-20"
              style={{ backgroundColor: '#cfd9ff' }}
            >
              <img
                src="/image/werk-logo-symbol-line.svg"
                alt="Avatar"
                width={40}
                height={40}
              />
            </div>
          }

          <div className="ml-4">
            <Button
              component="label"
              variant="outlined"
              onKeyDown={enterToClick}
            >
              Click to Upload
              <input
                // {...register("avatar")}
                hidden
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={onChangeFile}
              />
            </Button>
            <div className="text-xs mt-2">Use a square image for best results.</div>
          </div>
        </div>

        <hr className="my-6" />

        <label htmlFor="fullname" className="font-semibold w-required">Full Name</label>
        <p className="mb-3">Write your full name.</p>
        <TextField
          // {...register("fullname")}
          id="fullname"
          className="w-input-gray"
          required
          fullWidth
          variant="outlined"
          placeholder="Enter your full name"
        />
        {/* {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>} */}

        <hr className="my-6" />
      
        <label htmlFor="accountName" className="font-semibold w-required">Account Name</label>
        <p className="mb-3">This will also act as your profile URL slug.</p>
        <TextField
          // {...register("accountName")}
          className="w-input-group w-input-gray"
          id="accountName"
          required
          fullWidth
          variant="outlined"
          placeholder="Set your account name"
          InputProps={{
            startAdornment: <InputAdornment position="start" component="label" htmlFor="accountName">https://werk.id/@</InputAdornment>,
          }}
        />
        <div className="text-xs mt-2">Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.</div>
        {/* {errors.nickname && <div className="invalid-feedback d-block">{errors.nickname.message}</div>} */}

        <hr className="my-6" />

        <label htmlFor="headline" className="font-semibold w-required">Headline</label>
        <p className="mb-3">Write a brief introduction. This will show in talent searches.</p>
        <TextField
          // {...register("headline")}
          disabled={disabled}
          // isInvalid={!!errors.headline}
          className="w-input-gray"
          id="headline"
          required
          fullWidth
          placeholder="e.g. I'm an Account Executive based in Jakarta"
        />
        <div className="text-xs mt-2">100 characters.</div>
        {/* {errors.headline && <div className="invalid-feedback d-block">{errors.headline.message}</div>} */}

        <hr className="my-6" />

        <label htmlFor="bio" className="font-semibold">Your Bio</label>
        <p className="mb-3">
          Tell us about yourself so companies know who you are. Sharing more details about yourself and your achievements will help you stand out.
        </p>
        <TextField
          // {...register("bio")}
          className="w-input-gray w-multiline"
          id="bio"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="Write a few sentences about you and your experience..."
        />

        <hr className="my-6" />

        <label htmlFor="country" className="font-semibold w-required">Where are you based?</label>
        <p className="mb-3">Find roles based in your country.</p>
        <Autocomplete
          className="w-input-gray w-multiline"
          disabled={disabled}
          // disablePortal
          id="country"
          fullWidth
          options={COUNTRIES}
          renderInput={(params) => <TextField {...params} placeholder="Select Country" />}
        />
        {/* {errors.country && <div className="invalid-feedback">{errors.country.message}</div>} */}

        {children}

        <hr className="my-6" />

        <p className="text-right">
          <LoadingButton
            size="large"
            variant="contained"
            loading={disabled}
            type="submit"
            className="px-16"
          >
            Save
          </LoadingButton>
        </p>
      </fieldset>
    </form>
  );
}