// import { useRef } from "react"; // React, 
import Cropper, { ReactCropperProps } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props 
  extends ReactCropperProps {
    src?: any;
    className?: string;
    // onCropEnd?: Function;
    inRef?: any;
}

export default function Crop({
  src,
  className,
  inRef,
  // onCropEnd,
  ...etc
}: Props){
  // const cropperRef = useRef<HTMLImageElement>(null);

  // const cropStart = (e: any) => {
  //   // const imageElement: any = cropperRef?.current;
  //   // const cropper: any = imageElement?.cropper;
  //   console.log('cropStart e: ', e);
  //   // console.log('cropStart cropper: ', cropper);
  // }

  if(!inRef || !src){
    return null;
  }

  return (
    <Cropper
      {...etc}
      src={src} // "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      // style={{ height: 400, width: "100%" }}
      className={className}
      ref={inRef}
      // ref={cropperRef}
      // Cropper.js options
      // initialAspectRatio={16 / 9}
      // cropstart={cropStart}
      // cropend={cropEnd} // crop
    />
  );
}
