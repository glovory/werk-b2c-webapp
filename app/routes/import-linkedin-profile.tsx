// import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from "@remix-run/react";
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import WelcomeLayout from "~/components/WelcomeLayout";

interface FormProfileInputs {
  account_name: string
}

const Page: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    resolver: yupResolver(yup.object({
      account_name: yup.string().trim().required("Account Name is required and can't be empty."),
    }).required())
  });

  const onSave = (data: any) => {
    console.log('onSave data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onFinish(data);
        resolve();
      }, 2000);
    });
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

          <Form
            method="post"
            noValidate
            onSubmit={handleSubmit(onSave)}
          >
            <fieldset
              disabled={formLoading || isSubmitting}
              className="min-w-0 p-0 m-0 border-0 text-sm"
            >
              <label htmlFor="account_name" className="w-required font-semibold">Account Name</label>
              <p className="mb-3">This will also act as your profile URL slug.</p>
              <TextField
                {...register("account_name")}
                disabled={formLoading || isSubmitting}
                error={!!errors.account_name}
                // @ts-ignore:next-line
                helperText={errors?.account_name?.message}
                className="w-input-group w-input-gray"
                id="account_name"
                required
                fullWidth
                variant="outlined"
                placeholder="Set your account name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      component="label"
                      htmlFor="account_name"
                    >
                      https://werk.id/@
                    </InputAdornment>
                  ),
                }}
              />
              <div className="text-xs mt-2">
                Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.
              </div>

              <hr className="my-6" />

              <div className="text-right">
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={formLoading || isSubmitting}
                  type="submit"
                  className="px-16"
                >
                  Save
                </LoadingButton>
              </div>
            </fieldset>
          </Form>
        </div>
      </main>
    </WelcomeLayout>
  );
}

export default Page;
