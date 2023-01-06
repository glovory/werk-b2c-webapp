import { createImage } from "./imageProcessing";
import { ACCEPT_FILE } from '~/config';

/** @NOTE : Only SSR, for check disable JavaScript by user browser */
export const isSSR = () => !(typeof window !== 'undefined');

/**
 * Strict check image file
 * @param data : file object | string
 * @param accept : string | Array<string>, string e.g like accept input file attribute | Array<string> e.g ['jpg', 'jpeg', 'png']
 * @returns blob string | undefined
*/
export const isImage = async (
  data: any,
  accept: string | Array<string> = ACCEPT_FILE
) => {
  if(
    data && accept && 
    accept.includes((data?.type || data).split('/').pop())
  ){
    try {
      const src = data.name ? window.URL.createObjectURL(data) : data;
      const img: any = await createImage(src);
      if(img?.naturalWidth && img?.naturalHeight){
        return src;
      }
    } catch(e) {
      return;
    }
  }
}

// const returnError = (message: string | number, returnData?: any) => {
//   console.error(new Error(message));
//   // throw new Error(message);
//   return returnData;
// }
