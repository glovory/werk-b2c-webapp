import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//
import DialogWerk from '~/components/DialogWerk';
import FormSetting from '~/components/profile/FormSetting';

interface FormProfileProps {
  open?: boolean | any,
  values?: any,
  provinceValue?: string,
  cityValue?: string,
  onCloseModal?: () => void,
  onSubmit?: (data: any) => void,
  onChangeProvince?: any,
  onChangeCity?: any,
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

const accountNameValidateMessage = "Invalid account name. It can't contain symbol or space with minimum character is 3.";

export default function FormProfile({
  open,
  values,
  provinceValue,
  cityValue,
  onCloseModal,
  onSubmit,
  onChangeProvince,
  onChangeCity,
}: FormProfileProps){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    refineCore: { onFinish, formLoading },
    reset,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
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

  useEffect(() => {
    if(open && values){
      // console.log('useEffect open: ', open);
      reset(values);
    }
  }, [open, values]);

  const onSave = (data: any) => {
    console.log('onSave data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        // onFinish(data);
        onSubmit?.(data);
        resolve();
      }, 1e3);
    });
  }

  return (
    <DialogWerk
      title="Edit Profile"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      scroll="body"
      open={open}
      onClose={processForm ? undefined : onCloseModal}
    >
      <FormSetting
        className="p-6"
        provinceValue={provinceValue}
        cityValue={cityValue}
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
  );
}
