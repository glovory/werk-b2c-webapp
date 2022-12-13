import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';

import WelcomeLayout from "~/components/WelcomeLayout";

export default function Page(){
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSave = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <WelcomeLayout>
      <main className="bg-white py-9 px-4 flex justify-center grow">
        <div className="md:w-3/4">
          <div className="text-center mb-12 pb-5">
            <h1 className="h4">Setup your profile!</h1>
            <p>
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <form onSubmit={onSave} noValidate>
            <fieldset disabled={isSubmitting} className="min-w-0 p-0 m-0 border-0 text-sm">
              <label htmlFor="accountName" className="w-required font-semibold">Account Name</label>
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

              <p className="text-right">
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  type="submit"
                  className="px-16"
                >
                  Save
                </LoadingButton>
              </p>
            </fieldset>
          </form>
        </div>
      </main>
    </WelcomeLayout>
  );
}
