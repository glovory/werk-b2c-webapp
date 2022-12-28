import { useEffect } from 'react';
import { storage } from "~/utility";

import { BUCKET_ID } from '~/config';


export default function useGetFileView(
  fileId: string | null | undefined,
  action: any,
  // onError: any,
){
  useEffect(() => {
    if(fileId){
      storage.getFile(BUCKET_ID, fileId)
        .then(() => { // resFile: any
          const fileUrl = storage.getFileView(BUCKET_ID, fileId);
          action?.(fileUrl);
        })
        .catch((err) => {
          // console.log('err: ', err);
          action?.(null, err);
        });
    }
  }, [fileId]);
}
