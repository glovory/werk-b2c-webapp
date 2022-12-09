import { useEffect } from 'react'; // useState
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap//FormCheck';
import FormSelect from 'react-bootstrap//FormSelect';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../../components/form/Form';

interface Props {
  onSubmit?: Function | undefined,
  values?: Object | any,
}

export interface FormWorkExperienceInputs {
  job_position: string
  join_date: string
  end_date: string
  company_name: string
  company_location: string
  company_industry: string
  work_type: string
  commitment_type: string
  description: string
  isCurrentWork: boolean
}

const COUNTRIES = [
  'Indonesia',
  'Malaysia',
  'Thailand',
  'Singapore',
  'Saudi Arabia',
  'Philippines',
];
const COMPANY_INDUSTRIES = ['IT', 'Finance'];
const WORK_TYPES = ['Onsite', 'Remote Work', 'Hybrid'];
const COMMITMENT_TYPES = ['Internship', 'Volunteer', 'Part-time', 'Full time', 'Contract', 'Freelance Hourly Based', 'Freelance Task-Based', 'Freelance Project Based'];

export default function FormWorkExperience({
  onSubmit,
  values = {},
}: Props){
  // , defaultValues
  const { reset, register, handleSubmit, getValues, setValue, formState: { errors, isSubmitting } } = useForm<FormWorkExperienceInputs>({
    resolver: yupResolver(yup.object({
      job_position: yup.string().trim().required('Job Position is required.'),
      join_date: yup.string().trim().required("Join Date is required and can't be empty."),
      // end_date: yup.string().trim().required('End Date is required.'),
      company_name: yup.string().trim().required('Company Name is required.'),
      company_location: yup.string().trim().required('Company Location choice for Country.'),
      company_industry: yup.string().trim().required('Company Industry choice for Country.'),
      work_type: yup.string().trim().required('Work Type choice for Country.'),
      commitment_type: yup.string().trim().required('Commitment Type choice for Country.'),
    }).required())
  });

  const { isCurrentWork, end_date } = getValues();

  // effect runs when fetch state is updated
  useEffect(() => {
    // reset form with fetch data
    reset(values);
  }, [values]);

  const onSave = (data: FormWorkExperienceInputs) => {
    // console.log('data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onSubmit?.(data);
        resolve();
      }, 1e3);
    });
  }

  return (
    <Form
      // noValidate={false} // OPTION
      disabled={isSubmitting}
      onSubmit={handleSubmit(onSave)}
    >
      <label htmlFor="job_position" className="required form-label fw-semibold">Job Position</label>
      <FormControl
        {...register("job_position")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.job_position}
        id="job_position"
        placeholder="e.g. Account Executive"
        className="form-control-solid"
      />
      {errors.job_position && <div className="invalid-feedback">{errors.job_position.message}</div>}
      
      <hr className="my-9 border-secondary" />

      <label htmlFor="join_date" className="required form-label fw-semibold">Join Date</label>
      <FormControl
        {...register("join_date")}
        type="date"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.join_date}
        id="join_date"
        className="form-control-solid"
      />
      {errors.join_date && <div className="invalid-feedback">{errors.join_date.message}</div>}
      
      {!isCurrentWork &&
        <>
          <hr className="my-9 border-secondary" />

          <label htmlFor="end_date" className="required form-label fw-semibold">End Date</label>
          <FormControl
            {...register("end_date")}
            type="date"
            required
            disabled={isSubmitting}
            isInvalid={!!errors.end_date}
            id="end_date"
            className="form-control-solid"
          />
          {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
        </>
      }

      <FormCheck
        {...register("isCurrentWork")}
        // checked={} // getValues("end_date") === 'now'
        onChange={(e: any) => {
          console.log('checked: ', e.target.checked);
          console.log('end_date: ', end_date);
          if(e.target.checked && end_date){
            setValue('end_date', '');
          }
        }}
        type="checkbox"
        id="isCurrentWork"
        label="I'm currently working in this role."
        className="mt-4"
      />
      
      <hr className="my-9 border-secondary" />

      <label htmlFor="company_name" className="required form-label fw-semibold">Company Name</label>
      <FormControl
        {...register("company_name")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.company_name}
        id="company_name"
        placeholder="e.g. Glovory"
        className="form-control-solid"
      />
      {errors.company_name && <div className="invalid-feedback">{errors.company_name.message}</div>}
      
      <hr className="my-9 border-secondary" />

      <label htmlFor="company_location" className="required form-label fw-semibold">Company Location</label>
      <FormSelect
        {...register("company_location")}
        required
        disabled={isSubmitting}
        isInvalid={!!errors.company_location}
        id="company_location"
        className="form-select-solid"
      >
        <option value="">Select Country</option>
        {COUNTRIES.map((item: any) => 
          <option key={item} value={item}>{item}</option>
        )}
      </FormSelect>
      {errors.company_location && <div className="invalid-feedback">{errors.company_location.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="company_industry" className="required form-label fw-semibold">Company Industry</label>
      <FormSelect
        {...register("company_industry")}
        required
        disabled={isSubmitting}
        isInvalid={!!errors.company_industry}
        id="company_industry"
        className="form-select-solid"
      >
        <option value="">Select company industry</option>
        {COMPANY_INDUSTRIES.map((item: any) => 
          <option key={item} value={item}>{item}</option>
        )}
      </FormSelect>
      {errors.company_industry && <div className="invalid-feedback">{errors.company_industry.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="work_type" className="required form-label fw-semibold">Work Type</label>
      <FormSelect
        {...register("work_type")}
        required
        disabled={isSubmitting}
        isInvalid={!!errors.work_type}
        id="work_type"
        className="form-select-solid"
      >
        <option value="">Select work type</option>
        {WORK_TYPES.map((item: any) => 
          <option key={item} value={item}>{item}</option>
        )}
      </FormSelect>
      {errors.work_type && <div className="invalid-feedback">{errors.work_type.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="commitment_type" className="required form-label fw-semibold">Commitment Type</label>
      <FormSelect
        {...register("commitment_type")}
        required
        disabled={isSubmitting}
        isInvalid={!!errors.commitment_type}
        id="commitment_type"
        className="form-select-solid"
      >
        <option value="">Select commitment type</option>
        {COMMITMENT_TYPES.map((item: any) => 
          <option key={item} value={item}>{item}</option>
        )}
      </FormSelect>
      {errors.commitment_type && <div className="invalid-feedback">{errors.commitment_type.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="description" className="fw-semibold">Description</label>
      <FormControl
        {...register("description")}
        as="textarea"
        rows={4}
        disabled={isSubmitting}
        id="description"
        placeholder="Write a few sentences about your work experience..."
        className="form-control-solid"
      />
      
      {/* <hr className="my-9 border-secondary" /> */}

      <div className="text-end py-4 position-sticky bottom-0 z-10 bg-white border-top mt-4 mb-n6">
        <Button
          // size="sm"
          disabled={isSubmitting}
          type="submit"
          className="px-17"
        >
          {isSubmitting && <Spinner size="sm" className="me-2" />}
          Save
        </Button>
      </div>
    </Form>
  );
}
