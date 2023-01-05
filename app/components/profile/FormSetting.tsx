import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
//
import { DOMAIN } from '~/config';
import InputGroup from '~/components/form/InputGroup';
import CountryProvinceCity from '~/components/form/CountryProvinceCity';

interface FormSettingProps {
  className?: string,
  inputPhoto?: any, // boolean
  photo?: object | undefined | any,
  disabled?: boolean,
  register?: any,
  errors?: any,
  provinceValue?: any,
  cityValue?: any,
  // conditionCheckName?: any,
  setValue?: (...ops: any) => void,
  clearErrors?: (...ops: any) => void,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onChangeFile?: React.ChangeEventHandler<HTMLInputElement>,
  onChangeProvince?: any,
  onChangeCity?: any,
}

export default function FormSetting({
  className,
  inputPhoto,
  disabled,
  register,
  errors,
  provinceValue,
  cityValue,
  // conditionCheckName,
  setValue,
  clearErrors,
  onSubmit,
  onChangeProvince,
  onChangeCity,
}: FormSettingProps){

  return (
    <form
      className={className}
      noValidate
      onSubmit={onSubmit}
    >
      <fieldset disabled={disabled} className="min-w-0 p-0 m-0 border-0 text-sm">
        {inputPhoto}

        <label htmlFor="fullName" className="font-semibold w-required">Full Name</label>
        <p className="mb-3">Write your full name.</p>
        <TextField
          {...register("fullName")}
          disabled={disabled}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          id="fullName"
          className="w-input-gray"
          required
          fullWidth
          variant="outlined"
          placeholder="Enter your full name"
          inputProps={{ spellCheck: false }}
        />
        <hr className="my-6" />
      
        <label htmlFor="accountName" className="font-semibold w-required">Account Name</label>
        <p className="mb-3">This will also act as your profile URL slug.</p>
        <InputGroup
          {...register("accountName")}
          className="w-input-gray"
          disabled={disabled}
          error={!!errors.accountName}
          helperText={errors.accountName?.message}
          id="accountName"
          required
          fullWidth
          variant="outlined"
          placeholder="Set your account name"
          inputProps={{ spellCheck: false }}
          start={{
            label: DOMAIN + '/@',
            component: "label",
            htmlFor: "accountName",
            className: "text-gray-700",
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
          helperText={errors.headLine?.message}
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
          fullWidth
          variant="outlined"
          placeholder="Write a few sentences about you and your experience..."
          InputProps={{
            className: "p-0",
          }}
          inputProps={{
            className: "py-3 px-4 resize-y",
            sx: { overflow: 'auto!important', minHeight: 120, maxHeight: 300 },
          }}
        />
        <hr className="my-6" />

        <label htmlFor="country" className="font-semibold w-required">Where are you based?</label>
        <p className="mb-4">Find roles based in your country.</p>

        <CountryProvinceCity
          register={register}
          errors={errors}
          setValue={setValue}
          clearErrors={clearErrors}
          disabled={disabled}
          provinceValue={provinceValue}
          cityValue={cityValue}
          onChangeProvince={onChangeProvince}
          onChangeCity={onChangeCity}
        />
        <hr className="my-6" />

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
