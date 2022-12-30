import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetIdentity } from "@pankod/refine-core"; // useOne
// import { useNavigate } from "@remix-run/react";

import AuthSensor from '~/components/AuthSensor';
import WelcomeLayout from "~/components/WelcomeLayout";
import FormSetting from '~/components/profile/FormSetting';
import AvatarSetup from '~/components/AvatarSetup';
import { enterToClick } from '~/utils/dom';
import { storage } from "~/utility"; // , functions, normalizeFile
import { BUCKET_ID, CANDIDATE_PROFILES } from '~/config';

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
  // const navigate = useNavigate();
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
      resource: CANDIDATE_PROFILES,
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
  const [fileInput, setFileInput] = useState<any>();
  const [photoFile, setPhotoFile] = useState<any>();
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

  const onSaveAvatar = (crop: any, original: any) => {
    // console.log('onSaveAvatar original: ', original);
    setFileInput(original);
    setPhoto(crop);
    setPhotoFile(window.URL.createObjectURL(crop));
  }

  const onSave = async (data: any) => {
    let fixData = {
      ...data,
      avatar: "",
      avatarCropped: "",
    };
    if(photo){
      const userId = userData.$id;
      const originalFile = new File([fileInput], userId + ".jpg", {
        type: "image/jpeg" // fileInput.type,
      });
      const cropFile = new File([photo], userId + "_cropped.jpg", {
        type: "image/jpeg"
      });

      // const { $id } = 
      await storage.createFile(BUCKET_ID, userId, originalFile);
      // Cropped
      // const { $id: cropId } = 
      await storage.createFile(BUCKET_ID, userId + '_cropped', cropFile);
      // const avatarUrl = storage.getFileView(BUCKET_ID, $id);
      // const avatarCropUrl = storage.getFileView(BUCKET_ID, cropId);
      // console.log('onSave avatarUrl: ', avatarUrl);
      fixData.avatar = userId;
      fixData.avatarCropped = userId + '_cropped';
    }
    
    // console.log('onSave fixData: ', fixData);
    onFinish(fixData);
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
              inputPhoto={
                <>
                  <b>Your Photo</b>
                  <p className="mb-4">This will be displayed on your profile.</p>
                  <div className="flex items-start">
                    <AvatarSetup
                      loading={isLoading}
                      disabled={isLoading}
                      avatarProps={{
                        sx: { width: 80, height: 80 },
                      }}
                      iconProps={{
                        width: 40,
                        height: 40
                      }}
                      src={photoFile}
                      className="w-20 h-20"
                      label={(onChangeFile: any, disabled: any) => (
                        <div className="ml-4">
                          <Button
                            component="label"
                            variant="outlined"
                            disabled={isLoading}
                            onKeyDown={enterToClick}
                          >
                            Click to Upload
                            <input
                              // {...register("avatar")}
                              hidden
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              disabled={disabled}
                              onChange={onChangeFile}
                            />
                          </Button>
                          <div className="text-xs mt-2">Use a square image for best results.</div>
                        </div>
                      )}
                      onSave={onSaveAvatar}
                    />
                  </div>

                  <hr className="my-6" />
                </>
              }
              disabled={isLoading || formLoading || isSubmitting}
              register={register}
              errors={errors}
              setValue={setValue}
              onSubmit={handleSubmit(onSave)}
            />
          </Grid>
        </Grid>
      </WelcomeLayout>
    </AuthSensor>
  );
}

export default SetUpProfile;
