import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "@remix-run/react";
//
/** @NOTE : Enable this comment after the test */
// import LoadingPage from '~/components/LoadingPage';
import AuthSensor from '~/components/AuthSensor';
import WelcomeLayout from "~/components/WelcomeLayout";
import FormSetting from '~/components/profile/FormSetting';
import AvatarSetup from '~/components/AvatarSetup';
import { enterToClick } from '~/utils/dom';
import useCheckUserExist from '~/utils/hooks/useCheckUserExist';
import { storage } from "~/utility";
import { BUCKET_ID, CandidateProfiles } from '~/config';

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

const accountNameValidateMessage = "Invalid account name. It can't contain symbol or space with minimum character is 3.";

const SetUpProfile: React.FC = () => {
  const navigate = useNavigate();
  // Prevent access this page if isExist
  const { loading: isLoadingCheck, userData, isSuccess, isLoading } = useCheckUserExist((res: any) => {
    /** @NOTE : Enable this comment after the test */
    // if(res?.isExist){
    //   navigate('/', { replace: true });
    // }else{
    //   setTimeout(() => {
    //     setLoadingCheckUser(false);
    //   }, 95);
    // }
  });
  const {
    refineCore: { onFinish, formLoading },
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    refineCoreProps: {
      resource: CandidateProfiles,
      redirect: false,
    },
    // mode: "onChange",
    resolver: yupResolver(yup.object({
      fullName: yup.string().trim()
        .required('Full name is required.')
        .min(3, "The name must be at least 3 characters or more."),
      accountName: yup.string()
        .required("Account name is required and can't be empty.")
        .min(3, accountNameValidateMessage)
        .matches(/^[aA-zZ0-9._]+$/, accountNameValidateMessage), // "Only alphabets, number, underscore or period are allowed."
      headLine: yup.string().trim().required('A headline is required.').max(100, 'Maximum 100 characters.'),
      bio: yup.string().trim(),
      country: yup.string().nullable().required('Required choice for Country.'),
      province: yup.string().nullable().required('Required choice for Province/States.'),
      city: yup.string().nullable().required('Required choice for City.'),
    }).required())
  });
  /** @NOTE : Enable this comment after the test */
  // const [loadingCheckUser, setLoadingCheckUser] = useState<boolean>(true);
  const [fileInput, setFileInput] = useState<any>();
  const [photoFile, setPhotoFile] = useState<any>();
  const [photo, setPhoto] = useState<any>();
  const [provinceValue, setProvinceValue] = useState<any>(null);
  const [cityValue, setCityValue] = useState<any>(null);

  useEffect(() => {
    // reset form with fetch data
    if(!isLoading && isSuccess && userData){
      const { $id, name } = userData;
      reset({ candidateId: $id, fullName: name });
    }
  }, [userData, isSuccess, isLoading]);

  const onSaveAvatar = (crop: any, original: any) => {
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
      const cropName = userId + '_cropped';
      const originalFile = new File([fileInput], userId + '.jpg', {
        type: "image/jpeg"
      });
      const cropFile = new File([photo], cropName + '.jpg', {
        type: "image/jpeg"
      });

      await storage.createFile(BUCKET_ID, userId, originalFile);
      await storage.createFile(BUCKET_ID, cropName, cropFile);

      fixData.avatar = userId;
      fixData.avatarCropped = cropName;
    }
    
    onFinish(fixData)
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(() => {
        console.error('Failed setup profile');
      });
  }

  const onChangeProvince = (val: any) => {
    setProvinceValue(val);
  }

  /** @NOTE : Enable this comment after the test */
  // if(isLoadingCheck || isLoading || loadingCheckUser){
  //   return <LoadingPage />;
  // }

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
                            Select Photo Profile
                            <input
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
              provinceValue={provinceValue}
              cityValue={cityValue}
              onChangeProvince={onChangeProvince}
              onChangeCity={setCityValue}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              onSubmit={handleSubmit(onSave)}
            />
          </Grid>
        </Grid>
      </WelcomeLayout>
    </AuthSensor>
  );
}

export default SetUpProfile;
