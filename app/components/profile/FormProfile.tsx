// import { useState } from 'react';
import Dialog from '@mui/material/Dialog'; // , { DialogProps }
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import FormSetting from '~/components/profile/FormSetting';

interface Props {
  open?: boolean | any,
  onCloseModal?: () => void,
  onSubmit?: (data: any) => void,
}

interface FormProfileInputs {
  fullname: string
  account_name: string
  headline: string
  bio: string
  country: string
  states: string
  city: string
}

const STATES = ['Bali', 'DKI Jakarta', 'East Java', 'Jawa Tengah', 'Jawa Barat', 'Kalimantan Tengah', 'Kalimantan Barat', 'Kalimantan Timur', 'Kalimantan Selatan', 'Kalimantan Utara', 'Madura', 'Yogyakarta'];
const CITIES = ['Jakarta', 'Malang', 'Surabaya'];

export default function FormProfile({
  open,
  onCloseModal,
  onSubmit,
}: Props){
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    resolver: yupResolver(yup.object({
      fullname: yup.string().trim().required('Full name is required.'),
      account_name: yup.string().trim().required("Account Name is required and can't be empty."),
      headline: yup.string().trim().required('A headline is required.'),
      country: yup.string().trim().required('Required choice for Country.'),
      states: yup.string().trim().required('Required choice for Province/States.'),
      city: yup.string().trim().required('Required choice for City.'),
    }).required())
  });

  const onSave = (data: any) => {
    // console.log('onSave data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onFinish(data);
        onSubmit?.(data);
        resolve();
      }, 9000);
    });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={formLoading || isSubmitting ? undefined : onCloseModal}
        scroll="body"
        className="modal-bs"
      >
        <DialogTitle
          className="py-2 pr-2 flex items-center sticky top-0 z-10 bg-white rounded-t-md border-bottom"
        >
          Edit Profile
          <IconButton
            onClick={onCloseModal}
            disabled={formLoading || isSubmitting}
            className="ml-auto"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="mt-6">
          <FormSetting
            // @ts-ignore:next-line
            disabled={formLoading || isSubmitting}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSave)}
          >
            <div className="mt-3">
              <Autocomplete
                className="w-input-gray w-multiline"
                fullWidth
                options={STATES}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    {...register("states")}
                    disabled={formLoading || isSubmitting}
                    error={!!errors.states}
                    // @ts-ignore:next-line
                    helperText={errors?.states?.message}
                    id="states"
                    placeholder="Select Province/States"
                  />
                )}
              />
            </div>

            <div className="mt-3">
              <Autocomplete
                className="w-input-gray w-multiline"
                fullWidth
                options={CITIES}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    {...register("city")}
                    disabled={formLoading || isSubmitting}
                    error={!!errors.city}
                    // @ts-ignore:next-line
                    helperText={errors?.city?.message}
                    id="city"
                    placeholder="Select City"
                  />
                )}
              />
            </div>
          </FormSetting>
        </DialogContent>
      </Dialog>


    </>
  );
}
