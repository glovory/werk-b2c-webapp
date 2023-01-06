import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//
import DialogWerk from '~/components/DialogWerk';
import FormSetting from '~/components/profile/FormSetting';
import { functions } from "~/utility"; // storage, 
import { CandidateProfiles, CheckAccountAvailability } from '~/config'; // BUCKET_ID, 

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

// const availableAccountMessage = "Account name is available for you to use.";
const invalidAccountMessage = "Account name is already used.";
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
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileInputs>({
    refineCoreProps: {
      resource: CandidateProfiles,
      redirect: false,
    },
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

  const onSave = async (data: any) => {
    // console.log('onSave data: ', data);
    let isAvailableName = false;
    if(values?.accountName !== data.accountName){
      try {
        const res = await functions.createExecution(CheckAccountAvailability, `{"accountName":"${data.accountName}"}`);
        const { isAvailability, isAvailable }: any = res?.response ? JSON.parse(res.response) : {};
        // console.log('isAvailable: ', isAvailable);
        if(isAvailability || isAvailable){
          isAvailableName = true;
          clearErrors?.("accountName");
        }else{
          setError?.('accountName', { type: "manual", message: invalidAccountMessage });
        }
      } catch(err) {
        console.log('err: ', err); // type: manual | custom | focus
        setError?.('accountName', { type: "manual", message: `Failed check account name${navigator.onLine ? '.' : ', please check Your internet connection.'}` });
      }
    }else{
      isAvailableName = true;
    }

    if(isAvailableName){
      onFinish(data)
        .then(() => {
          onSubmit?.(data);
        })
        .catch(() => {
          console.error('Failed setup profile');
        });
    }

    // return new Promise((resolve: any) => {
    //   setTimeout(() => {
    //     // onFinish(data);
    //     onSubmit?.(data);
    //     resolve();
    //   }, 1e3);
    // });
  }

  const closeModal = () => {
    onCloseModal?.();
    reset(values);
  }

  return (
    <DialogWerk
      title="Edit Profile"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      scroll="body"
      open={open}
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
  );
}
