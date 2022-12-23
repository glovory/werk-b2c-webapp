import { useEffect } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { useNavigate } from "@remix-run/react";

import LoadingPage from '~/components/LoadingPage';
import { functions } from '~/utility';

const UserExist: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();

  useEffect(() => {
    // 
    if(!isLoading && isSuccess && userData){
      const { $id } = userData;
      // JSON.stringify({ userId: $id })
      functions.createExecution('63a02b6bbf99a9acd42c', `{"userId":"${$id}"}`)
      .then((res: any) => {
        const fixRes = JSON.parse(res?.response || '{}');
        navigate(fixRes.isExist ? '/' : '/build-profile', { replace: true });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
    }
  }, [userData, isSuccess, isLoading]);

  return <LoadingPage />;
}

export default UserExist;
