import { useState } from 'react';
import Grid from '@mui/material/Grid';

import WelcomeLayout from "~/components/WelcomeLayout";
import FormSetting from '~/components/profile/FormSetting';

export default function SetUpProfile(){
  const [photo, setPhoto] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    // console.log('file: ', file);
    if(file){
      setPhoto(file);
      // setValue('avatar', file);
    }
  }

  const onSave = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
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
            // @ts-ignore:next-line
            photo={photo}
            disabled={isSubmitting}
            onChangeFile={onChangeFile}
            onSubmit={onSave}
          />
        </Grid>
      </Grid>
    </WelcomeLayout>
  );
}
