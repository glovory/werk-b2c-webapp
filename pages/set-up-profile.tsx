import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form'; // Controller, 
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '../components/layouts/Home/LayoutHome';
import Form from '../components/form/Form';

interface IFormInputs {
  avatar: any
  fullname: string
  nickname: string
  headline: string
  bio: string
  country: string
}

const COUNTRIES = [
  'Indonesia'
];

export default function SetUpProfile(){
  // getValues, 
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<IFormInputs>({
    resolver: yupResolver(yup.object({
      fullname: yup.string().trim().required('Full name is required.'),
      nickname: yup.string().trim().required("Nickname is required and can't be empty."),
      headline: yup.string().trim().required('A headline is required.'),
      country: yup.string().trim().required('Required choice for Country.'),
    }).required())
  });

  const [photo, setPhoto] = useState<any>();

  const onEnterFile = (e: any) => {
    if(e.key === 'Enter'){
      e.target.click();
    }
  }

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    // console.log('file: ', file);
    if(file){
      setPhoto(file);
      setValue('avatar', file);
    }
  }

  const onSubmit = (data: IFormInputs) => {
    console.log('data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  // const avatar = getValues('avatar')
  // console.log('avatar: ', avatar);

  return (
    <Layout>
      <main className="bg-white py-9 px-4 d-flex align-items-center flex-grow-1">
        <div className="d-flex flex-column align-items-center flex-grow-1">
          <div className="col-md-4 col-sm-6">
            <div className="text-center mb-12">
              <Link href="/">
                <Image src="/image/werk-logo-symbol-space.svg" alt="Werk Logo" width={100} height={85} />
              </Link>
              <h1>Setup your profile!</h1>
              <p className="subheading text-black-50 pb-5">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <Form
              disabled={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
            >
              <b>Your Photo</b>
              <p className="text-black-50">This will be displayed on your profile.</p>

              <div className="d-flex align-items-start">
                {photo ?
                  <Image
                    className="rounded-circle object-cover flex-none"
                    width={80}
                    height={80}
                    alt="Avatar"
                    src={photo.name ? window.URL.createObjectURL(photo) : photo}
                  />
                  :
                  <div
                    className="rounded-circle d-grid place-items-center w-80px h-80px"
                    style={{ backgroundColor: '#d6ecfb' }}
                  >
                    <Image
                      priority
                      src="/image/werk-logo-symbol-line.svg"
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                }
                
                <div className="ms-5">
                  <label
                    // as="label"
                    // variant="outline-dark"
                    className="btn btn-outline btn-outline-primary btn-active-light-primary" // 
                    onKeyDown={onEnterFile}
                  >
                    Click to Upload
                    <input {...register("avatar")} onChange={onChangeFile} type="file" hidden accept=".jpg,.jpeg,.png" />
                  </label>
                  <div className="form-text">Use a square image for best results.</div>
                </div>

              </div>

              <hr className="my-9 border-secondary" />
              
              <label htmlFor="fullname" className="fw-bold">Full Name <sup className="text-danger">*</sup></label>
              <p className="text-black-50">Write your full name.</p>
              <FormControl
                {...register("fullname")}
                type="text"
                required
                disabled={isSubmitting}
                isInvalid={!!errors.fullname}
                id="fullname"
                placeholder="Enter your full name"
              />
              {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
              
              <hr className="my-9 border-secondary" />

              <label htmlFor="nickname" className="fw-bold">Nickname <sup className="text-danger">*</sup></label>
              <p className="text-black-50">This will also act as your profile URL slug.</p>
              <InputGroup>
                <InputGroup.Text as="label" htmlFor="nickname">https://werk.id/@</InputGroup.Text>
                <FormControl
                  {...register("nickname")}
                  type="text"
                  required
                  disabled={isSubmitting}
                  isInvalid={!!errors.nickname}
                  id="nickname"
                  placeholder="Set your nickname"
                />
              </InputGroup>
              <div className="form-text">Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.</div>
              {errors.nickname && <div className="invalid-feedback d-block">{errors.nickname.message}</div>}

              <hr className="my-9 border-secondary" />

              <label htmlFor="headline" className="fw-bold">Headline <sup className="text-danger">*</sup></label>
              <p className="text-black-50">Write a brief introduction. This will show in talent searches.</p>
              <FormControl
                {...register("headline")}
                type="text"
                required
                disabled={isSubmitting}
                isInvalid={!!errors.headline}
                id="headline"
                placeholder="e.g. I'm an Account Executive based in Jakarta"
              />
              <div className="form-text">100 characters.</div>
              {errors.headline && <div className="invalid-feedback d-block">{errors.headline.message}</div>}

              <hr className="my-9 border-secondary" />

              <label htmlFor="bio" className="fw-bold">Your Bio</label>
              <p className="text-black-50">
                Tell us about yourself so companies know who you are. Sharing more details about yourself and your achievements will help you stand out.
              </p>
              <FormControl
                {...register("bio")}
                type="text"
                disabled={isSubmitting}
                id="bio"
                as="textarea"
                placeholder="Write a few sentences about you and your experience..."
                rows={4}
              />
              
              <hr className="my-9 border-secondary" />

              <label htmlFor="country" className="fw-bold">Where are you based? <sup className="text-danger">*</sup></label>
              <p className="text-black-50">Find roles based in your country.</p>
              <FormSelect
                {...register("country")}
                required
                disabled={isSubmitting}
                isInvalid={!!errors.country}
                id="country"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((item: any) => 
                  <option key={item} value={item}>{item}</option>
                )}
              </FormSelect>
              {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}

              <hr className="my-9 border-secondary" />

              <p className="text-end">
                <Button disabled={isSubmitting} type="submit" className="px-17">
                  {isSubmitting && <Spinner size="sm" className="me-2" />}
                  Save
                </Button>
              </p>
            </Form>
          </div>
        </div>
        
      </main>
    </Layout>
  );
}
