import { useEffect, useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
//
import { functions } from '~/utility';
import { CheckUserExist } from '~/config';

/**
 * @param action = function e.g (data, error) => {}
 * @returns { userData, isSuccess, isLoading (useGetIdentity), loading (all loading process) }
 */
export default function useCheckUserExist(action: any){
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!isLoading && isSuccess && userData){
      const { $id } = userData;
      functions.createExecution(CheckUserExist, `{"candidateId":"${$id}"}`)
      .then((res: any) => {
        action?.(res?.response ? JSON.parse(res.response) : {});
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
