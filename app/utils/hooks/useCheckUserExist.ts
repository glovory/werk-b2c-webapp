import { useEffect, useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
//
import { functions } from '~/utility';
import { CHECK_USER_EXIST } from '~/config';

export default function useCheckUserExist(action: any){
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!isLoading && isSuccess && userData){
      const { $id } = userData;
      // JSON.stringify({ candidateId: $id })
      functions.createExecution(CHECK_USER_EXIST, `{"candidateId":"${$id}"}`)
      .then((res: any) => {
        // console.log('res: ', res);
        const { response, status } = res || {};
        const fixRes = response ? JSON.parse(response) : { isExist: status === 'failed' }; //  ? false
        action?.(fixRes);
      })
      .catch((err) => {
        action?.(null, err);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [userData, isSuccess, isLoading]);

  return { userData, isSuccess, isLoading, loading };
}
