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
  accountName: string
  headLine: string
  bio: string
  country: string
  province: string
  city: string
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
      accountName: yup.string().trim().required("Account Name is required and can't be empty."),
      headLine: yup.string().trim().required('A headline is required.').max(100, 'Maximum 100 characters.'),
      country: yup.string().trim().required('Required choice for Country.'),
      province: yup.string().required('Required choice for Province/States.'),
      city: yup.string().required('Required choice for City.'),
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
            photo={photo}
            disabled={formLoading || isSubmitting}
            register={register}
            errors={errors}
            setValue={setValue}
            onChangeFile={onChangeFile}
            onSubmit={handleSubmit(onSave)}
          />
        </Grid>
      </Grid>
    </WelcomeLayout>
  );
}

export default SetUpProfile;
