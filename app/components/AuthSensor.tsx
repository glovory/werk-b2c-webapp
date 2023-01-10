import { useEffect } from 'react';
import { useGetIdentity, useNavigation } from "@pankod/refine-core";
//
import LoadingPage from '~/components/LoadingPage';

interface AuthSensorProps {
  redirectTo?: string,
  children?: any,
}

export default function AuthSensor({
  redirectTo = "/",
  children
}: AuthSensorProps){
  const { replace } = useNavigation();
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();

  useEffect(() => {
    if(!isLoading && !isSuccess && !userData){
      replace(redirectTo);
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
