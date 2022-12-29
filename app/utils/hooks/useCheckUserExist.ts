import { useEffect } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { functions } from '~/utility';
import { CHECK_USER_EXIST } from '~/config';

export default function useCheckUserExist(action: any){
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();

  useEffect(() => {
    if(!isLoading && isSuccess && userData){
      const { $id } = userData;
      // JSON.stringify({ userId: $id })
      functions.createExecution(CHECK_USER_EXIST, `{"userId":"${$id}"}`)
      .then((res: any) => {
        const fixRes = JSON.parse(res?.response || '{}');
        action?.(fixRes);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
    }
  }, [userData, isSuccess, isLoading]);

  return { userData, isSuccess, isLoading };
}
