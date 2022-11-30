import React, { useState } from 'react'; // , { useCallback, useState }
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
// import { Controller, useForm } from 'react-hook-form';
// import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup';

// const schema = yup.object({
//   email: yup.string().email().required("Email address can't be empty"),
//   password: yup.string().required(),
// })

const FormLogin = () => {
  // const [loginError, setLoginError] = useState(false)
  // const { 
  //   register, formState: { errors, isValid }, handleSubmit } = useForm<{ email: string, password: string }>({
  //   resolver: yupResolver(schema),
  //   mode: "onSubmit",
  //   defaultValues: {
  //     password: " "
  //   }
  // })
  // const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  // const handleFormSubmit = useCallback(
  //   (data: { email: string, password: string } ) => {
  //     if (!isEmailValid) {
  //       if (data.email === "danny@glovory.com") {
  //         setIsEmailValid(true)
  //       }
  //     } else {
  //       alert('valid bos')
  //     }
  //   },
  //   [isEmailValid, errors]
  // )

  const router = useRouter();
  const [showAlertFile, setShowAlertFile] = useState<boolean>(false);

  const onEnterFile = (e: any) => {
    if(e.key === 'Enter'){
      e.target.click();
    }
  }

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    // console.log('file: ', file);
    if(file?.size > 5242880){
      setShowAlertFile(true);
    }
  }

  return (
    <>
      {/* main home-display */}
      <main className="text-center d-flex flex-column align-items-center flex-grow-1">
        <div className="col-md-4 col-sm-6">
          <Link href="/">
            <Image src="/image/werk-logo-symbol-space.svg" alt="Werk Logo" width={100} height={85} />
          </Link>
          {/* <div className="heading">Welcome to Werk, let's build your profile!</div> */}
          {/* <p className="subheading">Don't have an account? <Link href="/signup">Sign Up Now</Link></p> */}
          <h1>Welcome to Werk, let's build your profile!</h1>
          <p className="subheading text-black-50">
            Upload your resume or connect with LinkedIn (for autocomplete).<br />
            You can change it anytime in your profile.
          </p>

          <Button onClick={() => router.push("/linkedin-connect")} className="w-75 mt-6">
            <LinkedInIcon className="me-2" /> Import LinkedIn Profile
          </Button>

          <p className="mt-4 fw-bold text-black-50">OR</p>

          <Button onKeyDown={onEnterFile} as="label" className="w-75" variant="light">
            <FileUploadTwoToneIcon className="me-2" color="warning" /> Upload Resume PDF
            <input onChange={onChangeFile} type="file" hidden accept=".jpg,.jpeg,.png" />
          </Button>
          <div className="form-text">Upload resume in PDF format (max 5MB).</div>
          <Alert show={showAlertFile} variant="danger" className="w-75 mx-auto mt-5 mb-0 text-start">
            <b>Error:</b> File size is too big. Max file size 5MB.
          </Alert>

          <Button onClick={() => router.push("/set-up-profile")} className="w-75 fw-bold mt-9" variant="light">Skip this step</Button>

          {/* <div className="grid">
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
          </div> */}
        </div>
      </main>
    </>
  )
}

export default FormLogin