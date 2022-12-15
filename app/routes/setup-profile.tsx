import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import WelcomeLayout from "~/components/WelcomeLayout";
import FormSetting from '~/components/profile/FormSetting';

interface FormProfileInputs {
  avatar: any
  fullname: string
  account_name: string
  headline: string
  bio: string
  country: string
}

const SetUpProfile: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    resolver: yupResolver(yup.object({
      fullname: yup.string().trim().required('Full name is required.'),
      account_name: yup.string().trim().required("Account Name is required and can't be empty."),
      headline: yup.string().trim().required('A headline is required.'),
      country: yup.string().trim().required('Required choice for Country.'),
    }).required())
  });
  const [photo, setPhoto] = useState<any>();

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
      setValue('avatar', file);
    }
  }

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
      <Grid container className="justify-center grow py-8 px-4">
        <Grid item md={4} sm={6}>
          <div className="mb-12 pb-5 text-center">
            <h1 className="h4">Setup your profile!</h1>
            <p>
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          
          <FormSetting
            inputPhoto
            // @ts-ignore:next-line
            photo={photo}
            disabled={formLoading || isSubmitting}
            register={register}
            errors={errors}
            onChangeFile={onChangeFile}
            onSubmit={handleSubmit(onSave)}
          />
        </Grid>
      </Grid>
    </WelcomeLayout>
  );
}

export default SetUpProfile;
