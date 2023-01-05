// import { useCallback, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
// import debounce from 'lodash/debounce';
//
import { DOMAIN } from '~/config'; // CheckAccountAvailability
// import { functions } from '~/utility';
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
  availableAccountName?: any,
  // conditionCheckName?: any,
  setValue?: (...ops: any) => void,
  setError?: (...ops: any) => void,
  clearErrors?: (...ops: any) => void,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onChangeFile?: React.ChangeEventHandler<HTMLInputElement>,
  onChangeProvince?: any,
  onChangeCity?: any,
}

// const availableAccountMessage = "Account name is available for you to use.";
// const invalidAccountMessage = "Account name is already used.";

export default function FormSetting({
  className,
  inputPhoto,
  disabled,
  register,
  errors,
  provinceValue,
  cityValue,
  // availableAccountName,
  // conditionCheckName, // initAccountName
  setValue,
  // setError,
  clearErrors,
  onSubmit,
  onChangeProvince,
  onChangeCity,
}: FormSettingProps){
  // const [loadingCheckAccount, setLoadingCheckAccount] = useState<boolean>(false);
  // const [canUseAccountName, setCanUseAccountName] = useState<any>();

  // const parseCheckName = (val: any) => {
  //   const defaultCondition = val.length > 2 && /^[aA-zZ0-9._]+$/.test(val);
  //   return conditionCheckName ? conditionCheckName(defaultCondition, val) : defaultCondition;
  // }

  // const debouncedCheckAccountAvailability = useCallback(debounce((val) => {
  //   setLoadingCheckAccount(true);
  //   functions.createExecution(CheckAccountAvailability, `{"accountName":"${val}"}`)
  //     .then((res: any) => {
  //       const { isAvailability, isAvailable }: any = res?.response ? JSON.parse(res.response) : {};
  //       // console.log('isAvailable: ', isAvailable);
  //       let msg = null;
  //       if(isAvailability || isAvailable){
  //         msg = availableAccountMessage;
  //         clearErrors?.("accountName");
  //       }else{
  //         setError?.('accountName', { type: "manual", message: invalidAccountMessage });
  //       }
  //       setCanUseAccountName(msg);
  //     })
  //     .catch((err) => {
  //       console.log('err: ', err); // manual | custom | focus
  //       setError?.('accountName', { type: "manual", message: `Failed check account name${navigator.onLine ? '.' : ', please check Your internet connection.'}` });
  //     })
  //     .finally(() => {
  //       setLoadingCheckAccount(false);
  //     });
  // }, 500), []); // , { leading: true, trailing: false, maxWait: 1000 }

  // const onChangeAccountName = (e: any) => {
  //   const val = e.target.value;
  //   const valTrim = val.trim();
  //   if(valTrim.length > 2 && /^[aA-zZ0-9._]+$/.test(val)){ // parseCheckName(val)
  //     debouncedCheckAccountAvailability(valTrim);
  //     return;
  //   }
  //   setCanUseAccountName(null);
  //   clearErrors?.("accountName");
  // }

  // const onBlurAccountName = (e: any) => {
  //   const val = e.target.value;
  //   const valTrim = val.trim();
  //   if(valTrim.length < 3 || !/^[aA-zZ0-9._]+$/.test(val)){
  //     setCanUseAccountName(null);
  //   }
  // }

  // const debounceInput = debounce((e) => {
  //   onBlurAccountName(e);
  // }, 2500);

  // const onInputAccountName = (e: any) => {
  //   debounceInput(e);
  // }

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
          {...register("accountName")} // , { onChange: onChangeAccountName, onBlur: onBlurAccountName }
          // onInput={onInputAccountName}
          className="w-input-gray"
          disabled={disabled}
          // valid={!errors.accountName && (canUseAccountName || availableAccountName)}
          // valid={!errors.accountName && availableAccountName}
          error={!!errors.accountName}
          // helperText={errors.accountName?.message || canUseAccountName || availableAccountName}
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
          // end={(loadingCheckAccount || availableAccountName || canUseAccountName) ? {
          //   label: loadingCheckAccount ? 
          //     <CircularProgress color="inherit" size={18} />
          //     :
          //     (availableAccountName || canUseAccountName) && <CheckTwoToneIcon color="success" />,
          // } : null}
          // end={availableAccountName ? {
          //   label: availableAccountName && <CheckTwoToneIcon color="success" />,
          // } : null}
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
