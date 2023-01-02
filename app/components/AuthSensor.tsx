import { useEffect } from 'react';
import { useGetIdentity } from "@pankod/refine-core";
import { useNavigate } from "react-router-dom";

import LoadingPage from '~/components/LoadingPage';

interface AuthSensorProps {
  redirectTo?: string,
  children?: any,
}

export default function AuthSensor({
  redirectTo = "/",
  children
}: AuthSensorProps){
  const navigate = useNavigate();
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();

  useEffect(() => {
    if(!isLoading && !isSuccess && !userData){
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, isSuccess, userData]);

  if(isLoading){
    return <LoadingPage />;
  }

  // if(!isSuccess){
  //   return <></>;
  // }

  return isSuccess ? children : <></>;
}
