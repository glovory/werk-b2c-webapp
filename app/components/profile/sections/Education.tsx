import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWerk from '~/components/DialogWerk';

interface FormEducationInputs {
  educationTitle: string
  startDate: string
  endDate: string
  schoolName: string
}

export default function Education(){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    refineCore: { onFinish, formLoading },
    // reset,
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormEducationInputs>({
    // refineCoreProps: {
    //   resource: CANDIDATE_PROFILES,
    //   redirect: false,
    // },
    resolver: yupResolver(yup.object({
      educationTitle: yup.string().trim().required("Education Title is required."),
      startDate: yup.string().trim().required("Required choice for year range."), // Start Date is required.
      endDate: yup.string().trim().required('Required choice for year range.'), // End Date is required.
      schoolName: yup.string().trim().required('School or university name is required.').max(100, 'Maximum 100 characters.'),
    }).required())
  });

  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const doSave = (data: any) => {
    console.log('doSave data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onFinish(data);
        // onSubmit?.(data);
        resolve();
      }, 9000);
    });
  }

  return (
    <Card variant="outlined" className="max-md:rounded-none">
      <CardHeader
        avatar={<SchoolTwoToneIcon />}
        title="Education"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        className="border-bottom"
      />

      <div className="py-6 px-4">
        <div className="grid place-items-center gap-4 text-gray-400 text-sm">
          <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
            <SchoolTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
          </p>
          <p className="mb-4">Tell the company about your education.</p>
          <Button onClick={onOpenModal} variant="outlined" size="large" className="min-w-50p">
            <AddIcon fontSize="small" className="mr-2" />Add Education
          </Button>
        </div>
      </div>

      <DialogWerk
        title="Add Education"
        fullScreen={fullScreen}
        // fullWidth={false}
        // maxWidth="sm"
        scroll="body"
        open={openModal}
        onClose={formLoading || isSubmitting ? undefined : onCloseModal}
      >
        <form
          className="p-6"
          noValidate
          onSubmit={handleSubmit(doSave)} // onSubmit
        >
          <fieldset
            disabled={formLoading || isSubmitting}
            className="min-w-0 p-0 m-0 border-0 text-sm"
          >
            <label htmlFor="educationTitle" className="font-medium w-required">Education Title</label>
            <TextField
              {...register("educationTitle")}
              disabled={formLoading || isSubmitting}
              error={!!errors.educationTitle}
              // @ts-ignore:next-line
              helperText={errors?.educationTitle?.message}
              id="educationTitle"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="Enter education title"
            />
            <hr className="my-6" />

            <label className="font-medium w-required">Join Date</label>
            <div className="flex flex-row items-center mt-2">
              <TextField
                {...register("startDate")}
                disabled={formLoading || isSubmitting}
                error={!!errors.startDate}
                id="startDate"
                className="w-input-gray"
                required
                fullWidth
                variant="outlined"
                type="date"
              />
              <b className="p-2">-</b>
              <TextField
                {...register("endDate")}
                disabled={formLoading || isSubmitting}
                error={!!errors.endDate}
                id="endDate"
                className="w-input-gray"
                required
                fullWidth
                variant="outlined"
                type="date"
              />
            </div>
            {(errors?.startDate?.message || errors?.endDate?.message) && // @ts-ignore:next-line
              <div className="text-xs text-red-500 mt-1 pl-4">{errors?.startDate?.message || errors?.endDate?.message}</div>
            }
            <hr className="my-6" />

            <label htmlFor="schoolName" className="font-medium w-required">School or University Name</label>
            <TextField
              {...register("schoolName")}
              disabled={formLoading || isSubmitting}
              error={!!errors.schoolName}
              // @ts-ignore:next-line
              helperText={errors?.schoolName?.message}
              id="schoolName"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="Enter school or university name"
            />
            <hr className="my-6" />

            <div className="text-right">
              <LoadingButton
                size="large"
                variant="contained"
                loading={formLoading || isSubmitting}
                type="submit"
                className="px-16"
              >
                Save
              </LoadingButton>
            </div>
          </fieldset>
        </form>
      </DialogWerk>
    </Card>
  );
}
