import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';

const FormLogin = () => {
  const router = useRouter();
  const [showAlertFile, setShowAlertFile] = useState<boolean>(false);
  const [loadingSaveFile, setLoadingSaveFile] = useState<boolean>(false);

  const onEnterFile = (e: any) => {
    if(e.key === 'Enter'){
      e.target.click();
    }
  }

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    const isMaxSize = file?.size > 5242880;
    // console.log('file: ', file);
    setShowAlertFile(isMaxSize);

    // Process endpoint api here
    if(!isMaxSize){
      setLoadingSaveFile(true);
      setTimeout(() => {
        setLoadingSaveFile(false);
      }, 2000);
    }
  }

  return (
    <>
      <main className="text-center d-flex flex-column align-items-center flex-grow-1">
        <div className="col-md-4 col-sm-6">
          <Link href="/">
            <Image priority src="/image/werk-logo-symbol-space.svg" alt="Werk Logo" width={100} height={85} />
          </Link>
          <h1>Welcome to Werk, let's build your profile!</h1>
          <p className="fs-16px text-black-50">
            Upload your resume or connect with LinkedIn (for autocomplete).<br />
            You can change it anytime in your profile.
          </p>

          <Button onClick={() => router.push("/linkedin-connect")} className="w-75 mt-6">
            <LinkedInIcon className="me-2" /> Import LinkedIn Profile
          </Button>

          <p className="mt-4 fw-bold text-black-50">OR</p>

          <Button disabled={loadingSaveFile} onKeyDown={onEnterFile} as="label" className="w-75" variant="light">
            {loadingSaveFile ?
              <Spinner size="sm" className="me-2" />
              :
              <FileUploadTwoToneIcon className="me-2" color="primary" />
            }
            Upload Resume PDF
            <input disabled={loadingSaveFile} onChange={onChangeFile} type="file" hidden accept=".jpg,.jpeg,.png" />
          </Button>
          <div className="form-text">Upload resume in PDF format (max 5MB).</div>
          <Alert show={showAlertFile} variant="danger" className="w-75 mx-auto mt-5 mb-0 text-start">
            <b>Error:</b> File size is too big. Max file size 5MB.
          </Alert>

          <Button onClick={() => router.push("/set-up-profile")} className="w-75 fw-bold mt-9" variant="light">Skip this step</Button>
        </div>
      </main>
    </>
  )
}

export default FormLogin;
