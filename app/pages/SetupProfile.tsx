import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetIdentity } from "@pankod/refine-core"; // useOne
import { useNavigate } from "@remix-run/react";

import AuthSensor from '~/components/AuthSensor';
import WelcomeLayout from "~/components/WelcomeLayout";
import FormSetting from '~/components/profile/FormSetting';
import { storage } from "~/utility"; // , functions, normalizeFile

interface FormProfileInputs {
  avatar: any
  fullName: string
  accountName: string
  headLine: string
  bio: string
  country: string
  province: string
  city: string
}

const SetUpProfile: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();
  const {
    refineCore: { onFinish, formLoading },
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    refineCoreProps: {
      resource: "639a94a596500ae9a7d8",
      redirect: false,
    },
    resolver: yupResolver(yup.object({
      fullName: yup.string().trim().required('Full name is required.'),
      accountName: yup.string().trim().required("Account Name is required and can't be empty."),
      headLine: yup.string().trim().required('A headline is required.').max(100, 'Maximum 100 characters.'),
      country: yup.string().trim().required('Required choice for Country.'),
      province: yup.string().required('Required choice for Province/States.'),
      city: yup.string().required('Required choice for City.'),
    }).required())
  });
  const [photo, setPhoto] = useState<any>();

  // Prevent access this page if isExist
  // useEffect(() => {
  //   if(!isLoading && isSuccess && userData){
  //     const { $id } = userData;
  //     functions.createExecution('63a02b6bbf99a9acd42c', `{"userId":"${$id}"}`)
  //     .then((res: any) => {
  //       const fixRes = JSON.parse(res?.response || '{}');
  //       if(fixRes.isExist){
  //         navigate('/', { replace: true });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('err: ', err);
  //     });
  //   }
  // }, [userData, isSuccess, isLoading]);

  useEffect(() => {
    // reset form with fetch data
    if(!isLoading && isSuccess && userData){
      const { $id, name } = userData;
      reset({ id: $id, fullName: name });
    }
  }, [userData, isSuccess, isLoading]);

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
    }
  }

  const onSave = async (data: any) => {
    let fixData = {
      ...data,
      avatar: "",
      avatarCropped: "",
    };
    if(photo){
      const userId = userData.$id;
      // const ext = '.' + photo.name.split('.').pop();
      // const { $id } = 
      await storage.createFile("63a117a09c198a16ae4e", userId, photo); // userId + ext
      // Cropped
      // const { $id: cropId } = 
      await storage.createFile("63a117a09c198a16ae4e", userId + '_cropped', photo); // userId + '_cropped' + ext
      // const avatarUrl = storage.getFileView("63a117a09c198a16ae4e", $id);
      // const avatarCropUrl = storage.getFileView("63a117a09c198a16ae4e", cropId);
      // console.log('onSave avatarUrl: ', avatarUrl);
      fixData.avatar = userId;
      fixData.avatarCropped = userId + '_cropped';
    }
    
    console.log('onSave fixData: ', fixData);
    onFinish(fixData);

    // return new Promise((resolve: any) => {
    //   setTimeout(() => {
    //     onFinish(data);
    //     resolve();
    //   }, 2000);
    // });
  }

  return (
    <AuthSensor>
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
              disabled={isLoading || formLoading || isSubmitting}
              register={register}
              errors={errors}
              setValue={setValue}
              onChangeFile={onChangeFile}
              onSubmit={handleSubmit(onSave)}
            />
          </Grid>
        </Grid>
      </WelcomeLayout>
    </AuthSensor>
  );
}

export default SetUpProfile;
