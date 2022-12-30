import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWerk from '~/components/DialogWerk';
import FormSetting from '~/components/profile/FormSetting';

interface Props {
  open?: boolean | any,
  onCloseModal?: () => void,
  onSubmit?: (data: any) => void,
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

export default function FormProfile({
  open,
  onCloseModal,
  onSubmit,
}: Props){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    resolver: yupResolver(yup.object({
      fullName: yup.string().trim().required('Full name is required.'),
      accountName: yup.string().trim().required("Account Name is required and can't be empty."),
      headLine: yup.string().trim().required('A headline is required.').max(100, 'Maximum 100 characters.'),
      country: yup.string().trim().required('Required choice for Country.'),
      province: yup.string().trim().required('Required choice for Province/States.'),
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
      }, 3000);
    });
  }

  return (
    <DialogWerk
      title="Edit Profile"
      fullScreen={fullScreen}
      scroll="body"
      open={open}
      onClose={formLoading || isSubmitting ? undefined : onCloseModal}
    >
      <DialogContent className="mt-6">
        <FormSetting
          disabled={formLoading || isSubmitting}
          register={register}
          errors={errors}
          setValue={setValue}
          onSubmit={handleSubmit(onSave)}
        />
      </DialogContent>
    </DialogWerk>
  );
}
