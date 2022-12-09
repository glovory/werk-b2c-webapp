import { useEffect } from 'react'; // useState
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../../components/form/Form';

interface Props {
  values?: Object | any,
  onSubmit?: Function | undefined,
  onDelete?: Function | any,
}

export interface FormEducationInputs {
  education_title: string
  join_date: string
  end_date: string
  education_name: string
}

export default function FormEducation({
  values = {},
  onSubmit,
  onDelete,
}: Props){
  // , defaultValues, getValues, setValue
  const { reset, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormEducationInputs>({
    resolver: yupResolver(yup.object({
      education_title: yup.string().trim().required('Job Position is required.'),
      join_date: yup.string().trim().required("Join Date is required and can't be empty."),
      end_date: yup.string().trim().required('End Date is required.'),
      education_name: yup.string().trim().required('Company Name is required.'),
    }).required())
  });

  // const { isCurrentWork, end_date } = getValues();

  // effect runs when fetch state is updated
  useEffect(() => {
    // reset form with fetch data
    reset(values);
  }, [values]);

  const onSave = (data: FormEducationInputs) => {
    // console.log('data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onSubmit?.(data);
        resolve();
      }, 1e3);
    });
  }

  const deleteData = () => {
    if(window.confirm('Are you sure to delete this data?')){
      onDelete?.();
    }
  }

  return (
    <Form
      // noValidate={false} // OPTION
      disabled={isSubmitting}
      onSubmit={handleSubmit(onSave)}
    >
      <label htmlFor="education_title" className="required form-label fw-semibold">Education Title</label>
      <FormControl
        {...register("education_title")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.education_title}
        id="education_title"
        placeholder="Enter education title"
        className="form-control-solid"
      />
      {errors.education_title && <div className="invalid-feedback">{errors.education_title.message}</div>}
      
      <hr className="my-9 border-secondary" />

      <label className="required form-label fw-semibold">Year Range</label>
      <Row className="align-items-start">
        <Col md>
          <FormControl
            {...register("join_date")}
            type="date"
            required
            disabled={isSubmitting}
            isInvalid={!!errors.join_date}
            id="end_date"
            className="form-control-solid"
          />
          {errors.join_date && <div className="invalid-feedback">{errors.join_date.message}</div>}
        </Col>
        <div className="w-auto flex-none p-2">-</div>
        <Col md>
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
        </Col>
      </Row>

      <hr className="my-9 border-secondary" />

      <label htmlFor="education_name" className="required form-label fw-semibold">School or University Name</label>
      <FormControl
        {...register("education_name")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.education_name}
        id="education_name"
        placeholder="Enter school or university name"
        className="form-control-solid"
      />
      {errors.education_name && <div className="invalid-feedback">{errors.education_name.message}</div>}
      
      {/* <hr className="my-9 border-secondary" /> */}

      <div className="text-end py-4 border-top mt-4 mb-n6 d-flex flex-row-reverse">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="px-17"
        >
          {isSubmitting && <Spinner size="sm" className="me-2" />}
          Save
        </Button>

        {values?.education_name &&
          <Button onClick={deleteData} variant="link" className="text-danger me-auto">
            <DeleteTwoToneIcon /> Delete
          </Button>
        }
      </div>
    </Form>
  );
}
