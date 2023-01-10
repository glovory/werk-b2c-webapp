import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import AddIcon from '@mui/icons-material/Add';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//
import DialogWerk from '~/components/DialogWerk';
import LineClamp from '~/components/LineClamp';
import Time from '~/components/Time';
import DatePickerWerk from '~/components/form/DatePickerWerk';
import CountryProvinceCity from '~/components/form/CountryProvinceCity';
import incrementId from '~/utils/incrementId';
import dayjs from '~/utils/dayjs';

const COMPANY_INDUSTRY = [
  'Information Technology',
];
const WORK_TYPE = [
  'Onsite', 'Remote Work', 'Hybrid',
];
const COMMITMENT_TYPE = [
  'Internship', 'Volunteer', 'Part-time', 'Full time', 'Contract', 'Freelance Hourly Based', 'Freelance Task-Based', 'Freelance Project Based',
];

interface WorkExperienceProps {
  editable?: boolean,
  list: Array<any>,
  onSave?: (val: any) => void
  onDelete?: (val: any, closeConfirm: any, closeModal: any) => void
}

interface FormWorkExperienceInputs {
  jobPosition: string
  joinDate: string
  endDate: string
  companyName: string
  country: string
  province: string
  city: string
  companyIndustry: string
  workType: string
  commitmentType: string
  description: string
}

// if(typeof window !== 'undefined'){
//   // @ts-ignore
//   window.dayjs = dayjs;
// }

export default function WorkExperience({
  editable,
  list,
  onSave,
  onDelete,
}: WorkExperienceProps){
  const theme = useTheme();
  const isMediaQuery = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isCurrentWork, setIsCurrentWork] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [itemToEditDelete, setItemToEditDelete] = useState<any>({});
  const [provinceValue, setProvinceValue] = useState<any>(null);
  const [cityValue, setCityValue] = useState<any>(null);
  const [companyIndustryValue, setCompanyIndustryValue] = useState<any>();
  const [workTypeValue, setWorkTypeValue] = useState<any>();
  const [commitmentTypeValue, setCommitmentTypeValue] = useState<any>();
  const {
    refineCore: { formLoading }, // onFinish, 
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormWorkExperienceInputs>({
    // refineCoreProps: {
    //   resource: CandidateProfiles,
    //   redirect: false,
    // },
    defaultValues: itemToEditDelete,
    resolver: yupResolver(yup.object({
      jobPosition: yup.string().trim().required('Job Position is required.'),
      joinDate: yup.string().trim().required("Join Date is required and can't be empty."),
      endDate: yup.string().when([], {
        is: () => !isCurrentWork,
        then: yup.string().trim().required('End Date is required.'),
      }),
      companyName: yup.string().trim().required('Company Name is required.').max(100, 'Maximum 100 characters.'),
      country: yup.string().trim().required('Required choice for Country.'),
      province: yup.string().nullable().required('Required choice for Province/States.'),
      city: yup.string().nullable().required('Required choice for City.'),
      companyIndustry: yup.string().required('Required choice for Company Industry.'),
      workType: yup.string().required('Required choice for Work Type.'),
      commitmentType: yup.string().required('Required choice for Commitment Type.'),
    }).required())
  });
  const processForm = formLoading || isSubmitting;
  
  const onOpenModal = () => {
    reset({}); // Reset / clear form
    setItemToEditDelete({});
    setProvinceValue(null);
    setCityValue(null);
    setCompanyIndustryValue(null);
    setWorkTypeValue(null);
    setCommitmentTypeValue(null);
    setIsCurrentWork(false);
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
    setItemToEditDelete({});
  }

  const doSave = (val: any) => {
    const value = { ...val, id: incrementId() };
    console.log('doSave value: ', value);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        // onFinish(value);
        onSave?.(value);
        onCloseModal();
        resolve();
      }, 500);
    });
  }

  const onChangeIsCurrentWork = (e: any) => {
    const checked = e.target.checked;
    setIsCurrentWork(checked);
    checked && clearErrors('endDate'); // Reset / clear error field endDate
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const onClickEdit = (item: any) => {
    console.log('onClickEdit item: ', item);
    setItemToEditDelete(item);
    setProvinceValue(item.province);
    setCityValue(item.city);
    setCompanyIndustryValue(item.companyIndustry);
    setWorkTypeValue(item.workType);
    setCommitmentTypeValue(item.commitmentType);
    setIsCurrentWork(!item.endDate);
    setOpenModal(true);
    // reset(item);
  }

  const clickDelete = (item: any) => {
    setItemToEditDelete(item);
    setOpenConfirm(true);
  }

  const changeDate = (val: any, field: string) => {
    // console.log('changeDate val: ', val);
    setValue(field, val?.$d?.toISOString());
    clearErrors(field); // Manual clear error
  }

  const renderEndDate = (joinDate: any, endDate: any) => {
    // const years = dayjs(endDate).diff(oldDate, 'year');
    // const months = newDate.diff(oldDate, 'month') - years * 12;
    // const days = newDate.diff(oldDate.add(years, 'year').add(months, 'month'), 'day');

    let diffMonth = dayjs(endDate || new Date()).diff(joinDate, 'M');
    let years = parseInt('' + diffMonth / 12);
    let modMonth = diffMonth % 12;
    let fixValue = years ? ` | ${years} Years${modMonth ? ` ${modMonth} Months` : ''}` : diffMonth ? ` | ${diffMonth} Months` : '';
    
    if(endDate){
      return (
        <Time
          format="MMM YYYY"
          value={endDate}
          dateTime={endDate}
          end={fixValue}
        />
      )
    }
    return 'Now' + fixValue;
  }

  return (
    <Card variant="outlined" className="max-md:rounded-none w-card">
      <CardHeader
        className="py-3 border-bottom"
        avatar={<WorkTwoToneIcon />}
        title="Work Experience"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        action={
          editable && !!list?.length && (
            <Button onClick={onOpenModal} color="primary" className="min-w-0 font-bold">
              <AddCircleTwoToneIcon fontSize="small" className={isMediaQuery ? "" : "mr-2"} />
              {!isMediaQuery && 'Add Work Experience'}
            </Button>
          )
        }
      />

      <div className="py-6 px-4">
        {!!list?.length ?
          <div className="flex flex-col gap-6">
            {list.map((item: any) =>
              <section key={item.id} className="flex flex-row items-start">
                <div className="grid place-items-center rounded-full w-16 h-16 bg-w-blue-1 flex-none">
                  <DomainTwoToneIcon fontSize="large" color="primary" />
                </div>
                
                <div className="grow ml-4">
                  <div className="flex flex-row items-start">
                    <div className="grow pt-1 text-sm text-gray-500">
                      <h6 className="text-gray-700">{item.jobPosition}</h6>
                      <p>{item.companyName}</p>
                      <p>{item.workType} | {item.commitmentType}</p>
                      {/* Mar 2022 - Now | 9 Months */}
                      <p>
                        <Time
                          format="MMM YYYY"
                          value={item.joinDate}
                          dateTime={item.joinDate}
                        /> - {renderEndDate(item.joinDate, item.endDate)}
                      </p>
                      <p>{item.city}, {item.province}, {item.country}</p>
                    </div>

                    {editable && (
                      <IconButton onClick={() => onClickEdit(item)} color="primary" aria-label="edit" className="ml-2">
                        <EditTwoToneIcon />
                      </IconButton>
                    )}
                  </div>
          
                  {item.description &&
                    <LineClamp
                      id={item.id}
                      line={3}
                      label="Read more"
                      labelShow="Read less"
                      labelProps={{
                        disableRipple: true,
                        color: "primary",
                        className: "p-0 mt-2 underline font-normal",
                      }}
                      className="text-sm mt-2"
                    >
                      {item.description}
                    </LineClamp>
                  }
                </div>
              </section>
            )}

            {list.length > 3 && (
              <Button size="large" className="px-6 mx-auto bg-gray-100 text-gray-500">
                View All {list.length} Work Experiences
              </Button>
            )}
          </div>
          :
          editable && (
            <div className="grid place-items-center gap-4 text-gray-400 text-sm">
              <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
                <WorkTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
              </p>
              <p className="mb-4">Tell the company about your work experience.</p>
              <Button onClick={onOpenModal} variant="outlined" size="large" className="min-w-40p max-md:min-w-full">
                <AddIcon fontSize="small" className="mr-2" />Add Work Experience
              </Button>
            </div>
          )
        }
      </div>

      {editable &&
        <DialogWerk
          title="Add Work Experience"
          fullScreen={isMediaQuery}
          fullWidth
          maxWidth="xs"
          scroll="body"
          open={openModal}
          onClose={processForm ? undefined : onCloseModal}
        >
          <form
            className="p-6"
            noValidate
            onSubmit={handleSubmit(doSave)}
          >
            <fieldset
              disabled={processForm}
              className="min-w-0 p-0 m-0 border-0 text-sm"
            >
              <label htmlFor="jobPosition" className="font-medium w-required">Job Position</label>
              <TextField
                {...register("jobPosition")}
                disabled={processForm}
                error={!!errors.jobPosition}
                // @ts-ignore:next-line
                helperText={errors?.jobPosition?.message}
                id="jobPosition"
                className="w-input-gray mt-2"
                required
                fullWidth
                placeholder="e.g. Account Executive"
              />
              <hr className="my-6" />

              <label htmlFor="joinDate" className="font-medium w-required">Join Date</label>
              <DatePickerWerk
                {...register("joinDate")}
                value={itemToEditDelete?.joinDate || ''}
                onChange={(val: any) => changeDate(val, 'joinDate')}
                // disableFuture
                // disableHighlightToday
                // views={['year', 'day', 'month']}
                inputFormat="DD/MM/YYYY"
                fullWidth
                required
                disabled={processForm}
                error={!!errors.joinDate}
                helperText={errors?.joinDate?.message}
                id="joinDate"
                className="w-input-gray mt-2"
              />
              <hr className="my-6" />

              <label htmlFor="endDate" className="font-medium w-required">End Date</label>
              <DatePickerWerk
                {...register("endDate")}
                value={itemToEditDelete?.endDate || ''}
                onChange={(val: any) => changeDate(val, 'endDate')}
                inputFormat="DD/MM/YYYY"
                fullWidth
                required
                disabled={processForm || isCurrentWork}
                error={!!errors.endDate}
                helperText={errors?.endDate?.message}
                id="endDate"
                className="w-input-gray mt-2"
              />
              <FormControlLabel
                control={<Checkbox checked={isCurrentWork} onChange={onChangeIsCurrentWork} size="small" />}
                label="I'm currently working in this role."
              />
              <hr className="my-6" />

              <label htmlFor="companyName" className="font-medium w-required">Company Name</label>
              <TextField
                {...register("companyName")}
                disabled={processForm}
                error={!!errors.companyName}
                // @ts-ignore:next-line
                helperText={errors?.companyName?.message}
                id="companyName"
                className="w-input-gray mt-2"
                required
                fullWidth
                placeholder="e.g. Glovory"
              />
              <hr className="my-6" />

              <label className="font-medium w-required block mb-4">Company Location</label>
              <CountryProvinceCity
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                disabled={processForm}
                provinceValue={provinceValue}
                cityValue={cityValue}
                onChangeProvince={setProvinceValue}
                onChangeCity={setCityValue}
              />
              <hr className="my-6" />

              <label htmlFor="companyIndustry" className="font-medium w-required">Company Industry</label>
              <Autocomplete
                {...register("companyIndustry")}
                id="companyIndustry"
                className="w-input-gray w-multiline mt-2"
                fullWidth
                disableClearable
                value={companyIndustryValue}
                onChange={(e: any, val: any) => {
                  setCompanyIndustryValue(val)
                }}
                disabled={processForm}
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
                value={workTypeValue}
                onChange={(e: any, val: any) => {
                  setWorkTypeValue(val)
                }}
                disabled={processForm}
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
                value={commitmentTypeValue}
                onChange={(e: any, val: any) => {
                  setCommitmentTypeValue(val)
                }}
                disabled={processForm}
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
                disabled={processForm}
                multiline
                // rows={4}
                fullWidth
                placeholder="Write a few sentences about your work experience..."
                InputProps={{
                  className: "p-0",
                }}
                inputProps={{
                  className: "py-3 px-4 resize-y",
                  sx: { overflow: 'auto!important', minHeight: 120, maxHeight: 300 },
                }}
              />
              <hr className="my-6" />

              <div className="flex">
                {itemToEditDelete?.jobPosition &&
                  <Button onClick={() => clickDelete(itemToEditDelete)} size="large" color="error">
                    <DeleteTwoToneIcon className="mr-1" />Delete
                  </Button>
                }
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={processForm}
                  type="submit"
                  className="px-16 ml-auto"
                >
                  Save
                </LoadingButton>
              </div>
            </fieldset>
          </form>
        </DialogWerk>
      }

      {editable &&
        <DialogWerk
          title="Delete Work Experience"
          fullWidth
          maxWidth="xs"
          scroll="body"
          open={openConfirm}
          onClose={processForm ? undefined : closeConfirm}
        >
          <div className="p-6">
            Are you sure want to delete this work experience?
          </div>
          <DialogActions className="py-3 px-4 border-top">
            <Button
              size="large"
              color="error"
              variant="contained"
              className="px-6"
              onClick={() => onDelete?.(itemToEditDelete, closeConfirm, onCloseModal)}
            >
              Delete
            </Button>
          </DialogActions>
        </DialogWerk>
      }
    </Card>
  );
}
