import { useEffect } from 'react'; // useState
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../../components/form/Form';

interface Props {
  onSubmit?: Function | undefined, 
  children?: any,
  values?: Object | any,
  validation?: Object | any,
}

export interface FormProfileInputs {
  // avatar: any
  fullname: string
  nickname: string
  headline: string
  bio: string
  country: string
}

const COUNTRIES = [
  'Indonesia',
  'Malaysia',
  'Thailand',
  'Singapore',
  'Saudi Arabia',
  'Philippines',
];

export default function FormProfile({
  onSubmit,
  values = {},
  validation,
  children
}: Props){
  const { reset, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormProfileInputs>({
    resolver: yupResolver(yup.object({
      ...validation,
      fullname: yup.string().trim().required('Full name is required.'),
      nickname: yup.string().trim().required("Nickname is required and can't be empty."),
      headline: yup.string().trim().required('A headline is required.'),
      country: yup.string().trim().required('Required choice for Country.'),
    }).required())
  });

  // effect runs when fetch state is updated
  useEffect(() => {
    // reset form with fetch data
    reset(values);
  }, [values]);

  const onSave = (data: FormProfileInputs) => {
    console.log('data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onSubmit?.(data);
        resolve();
      }, 2000);
    });
  }

  return (
    <Form
      disabled={isSubmitting}
      onSubmit={handleSubmit(onSave)}
    > 
      <label htmlFor="fullname" className="required form-label fw-semibold">Full Name</label>
      <p className="text-black-50">Write your full name.</p>
      <FormControl
        {...register("fullname")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.fullname}
        id="fullname"
        placeholder="Enter your full name"
        className="form-control-solid"
      />
      {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
      
      <hr className="my-9 border-secondary" />

      <label htmlFor="nickname" className="required form-label fw-semibold">Nickname</label>
      <p className="text-black-50">This will also act as your profile URL slug.</p>
      <InputGroup>
        <InputGroup.Text as="label" htmlFor="nickname" className="bg-secondary">https://werk.id/@</InputGroup.Text>
        <FormControl
          {...register("nickname")}
          type="text"
          required
          disabled={isSubmitting}
          isInvalid={!!errors.nickname}
          id="nickname"
          placeholder="Set your nickname"
          className="form-control-solid"
        />
      </InputGroup>
      <div className="form-text">Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.</div>
      {errors.nickname && <div className="invalid-feedback d-block">{errors.nickname.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="headline" className="required form-label fw-semibold">Headline</label>
      <p className="text-black-50">Write a brief introduction. This will show in talent searches.</p>
      <FormControl
        {...register("headline")}
        type="text"
        required
        disabled={isSubmitting}
        isInvalid={!!errors.headline}
        id="headline"
        placeholder="e.g. I'm an Account Executive based in Jakarta"
        className="form-control-solid"
      />
      <div className="form-text">100 characters.</div>
      {errors.headline && <div className="invalid-feedback d-block">{errors.headline.message}</div>}

      <hr className="my-9 border-secondary" />

      <label htmlFor="bio" className="fw-semibold">Your Bio</label>
      <p className="text-black-50">
        Tell us about yourself so companies know who you are. Sharing more details about yourself and your achievements will help you stand out.
      </p>
      <FormControl
        {...register("bio")}
        as="textarea"
        rows={4}
        disabled={isSubmitting}
        id="bio"
        placeholder="Write a few sentences about you and your experience..."
        className="form-control-solid"
      />
      
      <hr className="my-9 border-secondary" />

      <label htmlFor="country" className="required form-label fw-semibold">Where are you based?</label>
      <p className="text-black-50">Find roles based in your country.</p>
      <FormSelect
        {...register("country")}
        required
        disabled={isSubmitting}
        isInvalid={!!errors.country}
        id="country"
        className="form-select-solid"
      >
        <option value="">Select Country</option>
        {COUNTRIES.map((item: any) => 
          <option key={item} value={item}>{item}</option>
        )}
      </FormSelect>
      {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}

      {typeof children === 'function' ? children({ register, isSubmitting, errors }) : children}

      <hr className="my-9 border-secondary" />

      <p className="text-end">
        <Button disabled={isSubmitting} type="submit" className="px-17">
          {isSubmitting && <Spinner size="sm" className="me-2" />}
          Save
        </Button>
      </p>
    </Form>
  );
}
