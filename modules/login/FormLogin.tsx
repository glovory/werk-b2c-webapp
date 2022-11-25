import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().email().required("Email address can't be empty"),
  password: yup.string().required(),
})

const FormLogin = () => {
  const [loginError, setLoginError] = useState(false)
  const { 
    register, formState: { errors, isValid }, handleSubmit } = useForm<{ email: string, password: string }>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: " "
    }
  })
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const handleFormSubmit = useCallback(
    (data: { email: string, password: string } ) => {
      if (!isEmailValid) {
        if (data.email === "danny@glovory.com") {
          setIsEmailValid(true)
        }
      } else {
        alert('valid bos')
      }
    },
    [isEmailValid, errors]
  )


  return (
    <>
        <main className="main home-display">
          <div className="col-md-3 col-sm-6">
            <Image src="/image/werk-logo-symbol-space.svg" alt="Vercel Logo" width={100} height={85} />
            <div className="heading">Sign In to Werk</div>
            <p className="subheading">Don't have an account? <a href="/signup">Sign Up Now</a></p>

            <div className="grid">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="mb-12">
                    <div className="form-home">
                      <label className="form-label">Email Address</label>
                      <input
                        type="text"
                        className={`
                          form-control form-control-solid
                          ${!!errors.email?.message && "form-error"}
                        `}
                        placeholder="Enter your email address"
                        {...register("email")}
                      />
                      <p className="form-error-label">{errors.email?.message}</p>
                    </div>
                    {(isEmailValid && !errors.email) && (
                      <div className="form-home">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-solid"
                          placeholder="Enter your password"
                          {...register("password")}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-default btn-default-main"
                    type='submit'
                  >
                    {isEmailValid ? "Sign In" : "Next"}
                  </button>
                  
                  
                  <div className="col-md-12 form-footer">
                    <p className="text-main">Forgot Password?</p>
                    <p className="text-shadow">OR</p>
                  </div>
                  <a href="#" className="btn btn-default btn-default-google"><i className="fa-brands fa-google fs-4 me-2"></i>Continue With Google</a>
              </form>
            </div>
          </div>
        </main>
    </>
  )
}

export default FormLogin