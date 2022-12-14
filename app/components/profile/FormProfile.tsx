import { useState } from 'react';
import Button from '@mui/material/Button';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useUpdate, useNotification, useNavigation } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import isEqual from "react-fast-compare";
//
import DialogWerk from '~/components/DialogWerk';
import FormSetting from '~/components/profile/FormSetting';
import { functions } from "~/utility";
import { CandidateProfiles, CheckAccountAvailability } from '~/config';

interface FormProfileProps {
  documentId?: any
  values?: any
  provinceValue?: string
  cityValue?: string
  onChangeProvince?: (data: any) => void
  onChangeCity?: (data: any) => void
}

interface FormProfileInputs {
  fullName: string
  accountName: string
  headLine: string
  bio: string
  country: string
  province: string
  city: string
}

// const availableAccountMessage = "Account name is available for you to use.";
const invalidAccountMessage = "Account name is already used.";
const accountNameValidateMessage = "Invalid account name. It can't contain symbol or space with minimum character is 3.";

export default function FormProfile({
  documentId,
  values,
  provinceValue,
  cityValue,
  onChangeProvince,
  onChangeCity,
}: FormProfileProps){
  const theme = useTheme();
  const isMediaQuery = useMediaQuery(theme.breakpoints.down('md'));
  const { replace } = useNavigation();
  const { open: openNotif } = useNotification(); // , close: closeNotif
  const { mutate } = useUpdate();
  const {
    refineCore: { formLoading }, // onFinish, 
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    defaultValues: values,
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
  const processForm = formLoading || isSubmitting;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const notifUpdatedOk = () => {
    // @ts-ignore
    openNotif({ type: "success", message: "Profile updated successfully", key: "notifSaveEdit" });
  }

  const onSave = async (data: any) => {
    if(isEqual(values, data)){ // Prevent hit API if value same with initial value
      notifUpdatedOk();
      setOpenModal(false);
    }else{
      const isEditAccountName = values.accountName !== data.accountName;
      if(isEditAccountName){
        try {
          const res = await functions.createExecution(CheckAccountAvailability, `{"accountName":"${data.accountName}"}`);
          const { isAvailability, isAvailable }: any = res?.response ? JSON.parse(res.response) : {};
          if(isAvailability || isAvailable){
            clearErrors?.("accountName");
          }else{
            setError?.('accountName', { type: "manual", message: invalidAccountMessage });
            return;
          }
        } catch(err) {
          // console.log('err: ', err); // type: manual | custom | focus
          setError?.('accountName', { type: "manual", message: `Failed check account name${navigator.onLine ? '.' : ', please check Your internet connection.'}` });
          return;
        }
      }

      if(navigator.onLine){
        // https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/
        mutate({
          resource: CandidateProfiles,
          id: documentId,
          values: data,
          successNotification: false,
        });

        if(isEditAccountName){
          replace('/profile/' + data.accountName);
        }
        notifUpdatedOk();
        setOpenModal(false);
      }else{ // @ts-ignore
        openNotif({ type: "error", message: "Profile updated failed, please check your internet connection", key: "notifSaveEdit" });
      }
    }
  }

  const closeModal = () => {
    setOpenModal(false);
    reset(values);
  }

  return (
    <>
      <Button
        // disabled={isLoadingCurrentUser}
        onClick={() => setOpenModal(true)}
        className="min-w-0"
      >
        <EditTwoToneIcon fontSize="small" className="mr-2" />
        Edit Profile
      </Button>

      <DialogWerk
        title="Edit Profile"
        fullScreen={isMediaQuery}
        fullWidth
        maxWidth="xs"
        scroll="body"
        open={openModal}
        onClose={processForm ? undefined : closeModal}
      >
        <FormSetting
          className="p-6"
          provinceValue={provinceValue}
          cityValue={cityValue}
          // conditionCheckName={(defaultCondition: any, val: any) => defaultCondition && values?.accountName !== val}
          disabled={processForm}
          register={register}
          errors={errors}
          setValue={setValue}
          clearErrors={clearErrors}
          onSubmit={handleSubmit(onSave)}
          onChangeProvince={onChangeProvince}
          onChangeCity={onChangeCity}
        />
      </DialogWerk>
    </>
  );
}
