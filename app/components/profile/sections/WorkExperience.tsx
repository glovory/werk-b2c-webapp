import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWerk from '~/components/DialogWerk';

const COUNTRIES = [
  'Indonesia',
];
const COMPANY_INDUSTRY = [
  'Information Technology',
];
const WORK_TYPE = [
  'Onsite', 'Remote Work', 'Hybrid',
];
const COMMITMENT_TYPE = [
  'Internship', 'Volunteer', 'Part-time', 'Full time', 'Contract', 'Freelance Hourly Based', 'Freelance Task-Based', 'Freelance Project Based',
];

interface FormWorkExperienceInputs {
  jobPosition: string
  joinDate: string
  endDate: string
  companyName: string
  companyLocation: string
  companyIndustry: string
  workType: string
  commitmentType: string
  description: string
}

export default function WorkExperience(){
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
  } = useForm<FormWorkExperienceInputs>({
    // refineCoreProps: {
    //   resource: CANDIDATE_PROFILES,
    //   redirect: false,
    // },
    resolver: yupResolver(yup.object({
      jobPosition: yup.string().trim().required('Job Position is required.'),
      joinDate: yup.string().trim().required("Join Date is required and can't be empty."),
      endDate: yup.string().trim().required('End Date is required.'),
      companyName: yup.string().trim().required('Company Name is required.').max(100, 'Maximum 100 characters.'),
      companyLocation: yup.string().trim().required('Required choice for Company Location.'),
      companyIndustry: yup.string().required('Required choice for Company Industry.'),
      workType: yup.string().required('Required choice for Work Type.'),
      commitmentType: yup.string().required('Required choice for Commitment Type.'),
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
        avatar={<WorkTwoToneIcon />}
        title="Work Experience"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        // action={
        //   <Switch defaultChecked />
        // }
        className="border-bottom"
      />

      <div className="py-6 px-4">
        <div className="grid place-items-center gap-4 text-gray-400 text-sm">
          <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
            <WorkTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
          </p>
          <p className="mb-4">Tell the company about your work experience.</p>
          <Button onClick={onOpenModal} variant="outlined" size="large" className="min-w-50p">
            <AddIcon fontSize="small" className="mr-2" />Add Work Experience
          </Button>
        </div>
      </div>

      <DialogWerk
        title="Add Work Experience"
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
            <label htmlFor="jobPosition" className="font-medium w-required">Job Position</label>
            <TextField
              {...register("jobPosition")}
              disabled={formLoading || isSubmitting}
              error={!!errors.jobPosition}
              // @ts-ignore:next-line
              helperText={errors?.jobPosition?.message}
              id="jobPosition"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="e.g. Account Executive"
            />
            <hr className="my-6" />

            <label htmlFor="joinDate" className="font-medium w-required">Join Date</label>
            <TextField
              {...register("joinDate")}
              disabled={formLoading || isSubmitting}
              error={!!errors.joinDate}
              // @ts-ignore:next-line
              helperText={errors?.joinDate?.message}
              id="joinDate"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              type="date"
            />
            <hr className="my-6" />

            <label htmlFor="endDate" className="font-medium w-required">End Date</label>
            <TextField
              {...register("endDate")}
              disabled={formLoading || isSubmitting}
              error={!!errors.endDate}
              // @ts-ignore:next-line
              helperText={errors?.endDate?.message}
              id="endDate"
              className="w-input-gray my-2"
              required
              fullWidth
              variant="outlined"
              type="date"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="I'm currently working in this role."
            />
            <hr className="my-6" />

            <label htmlFor="companyName" className="font-medium w-required">Company Name</label>
            <TextField
              {...register("companyName")}
              disabled={formLoading || isSubmitting}
              error={!!errors.companyName}
              // @ts-ignore:next-line
              helperText={errors?.companyName?.message}
              id="companyName"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="e.g. Glovory"
            />
            <hr className="my-6" />

            <label htmlFor="companyLocation" className="font-medium w-required">Company Location</label>
            <Autocomplete
              {...register("companyLocation", { value: COUNTRIES[0] })}
              id="companyLocation"
              className="w-input-gray w-multiline mt-2"
              fullWidth
              disableClearable
              readOnly
              disabled={formLoading || isSubmitting}
              defaultValue={COUNTRIES[0]}
              options={COUNTRIES}
              renderInput={(props) => (
                <TextField
                  {...props}
                  name="companyLocation"
                  error={!!errors.companyLocation}
                  // @ts-ignore:next-line
                  helperText={errors?.companyLocation?.message}
                  placeholder="Select Country"
                />
              )}
            />
            <hr className="my-6" />

            <label htmlFor="companyIndustry" className="font-medium w-required">Company Industry</label>
            <Autocomplete
              {...register("companyIndustry")}
              id="companyIndustry"
              className="w-input-gray w-multiline mt-2"
              fullWidth
              disableClearable
              disabled={formLoading || isSubmitting}
              options={COMPANY_INDUSTRY}
              renderInput={(props) => (
                <TextField
                  {...props}
                  name="companyIndustry"
                  error={!!errors.companyIndustry}
                  // @ts-ignore:next-line
                  helperText={errors?.companyIndustry?.message}
                  placeholder="Select company industry"
                />
              )}
            />
            <hr className="my-6" />

            <label htmlFor="workType" className="font-medium w-required">Work Type</label>
            <Autocomplete
              {...register("workType")}
              id="workType"
              className="w-input-gray w-multiline mt-2"
              fullWidth
              disableClearable
              disabled={formLoading || isSubmitting}
              options={WORK_TYPE}
              renderInput={(props) => (
                <TextField
                  {...props}
                  name="workType"
                  error={!!errors.workType}
                  // @ts-ignore:next-line
                  helperText={errors?.workType?.message}
                  placeholder="Select work type"
                />
              )}
            />
            <hr className="my-6" />

            <label htmlFor="commitmentType" className="font-medium w-required">Commitment Type</label>
            <Autocomplete
              {...register("commitmentType")}
              id="commitmentType"
              className="w-input-gray w-multiline mt-2"
              fullWidth
              disableClearable
              disabled={formLoading || isSubmitting}
              options={COMMITMENT_TYPE}
              renderInput={(props) => (
                <TextField
                  {...props}
                  name="commitmentType"
                  error={!!errors.commitmentType}
                  // @ts-ignore:next-line
                  helperText={errors?.commitmentType?.message}
                  placeholder="Select commitment type"
                />
              )}
            />
            <hr className="my-6" />

            <label htmlFor="description" className="font-medium">Description</label>
            <TextField
              {...register("description")}
              className="w-input-gray w-multiline mt-2"
              id="description"
              disabled={formLoading || isSubmitting}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Write a few sentences about your work experience..."
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
