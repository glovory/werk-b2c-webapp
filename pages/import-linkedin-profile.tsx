// import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form'; // Controller, 
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '../components/layouts/Home/LayoutHome';
import Form from '../components/form/Form';

interface IFormInputs {
  nickname: string
}

export default function Page(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormInputs>({
    resolver: yupResolver(yup.object({
      nickname: yup.string().trim().required("Nickname is required and can't be empty."),
    }).required())
  });

  const onSubmit = (data: IFormInputs) => {
    console.log('data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

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
              <label htmlFor="nickname" className="fw-bold">Nickname <sup className="text-danger">*</sup></label>
              <p className="text-black-50">This will also act as your profile URL slug.</p>
              <InputGroup>
                <InputGroup.Text as="label" htmlFor="nickname">https://werk.id/@</InputGroup.Text>
                <FormControl
                  {...register("nickname")}
                  disabled={isSubmitting}
                  isInvalid={!!errors.nickname}
                  id="nickname"
                  placeholder="Set your nickname"
                />
              </InputGroup>
              <div className="form-text">Minimum character is 3 and can combine with number, underscore or period. Space or symbol are not allowed.</div>
              {errors.nickname && <div className="invalid-feedback d-block">{errors.nickname.message}</div>}

              <hr className="my-9 border-secondary" />

              <p className="text-end">
                <Button disabled={isSubmitting} type="submit" variant="warning" className="px-17">
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
