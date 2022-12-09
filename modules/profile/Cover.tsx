import { useState, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import OpenWithTwoToneIcon from '@mui/icons-material/OpenWithTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Cx } from '../../utils/dom';
import Crop from '../../components/Crop';
import UnsplashIcon from '../../svg/unsplash.svg';

interface Props {
  src?: any;
  disabled?: boolean;
}

export default function Cover({
  src,
  disabled,
}: Props){
  const cropperRef = useRef<HTMLImageElement>(null);
  const [coverImage, setCoverImage] = useState<any>();

  const onLoadCover = (e: any) => {
    // console.log('onLoadCover');
    e.target.classList.remove('img-loader');
  }

  const onEnterFile = (e: any) => {
    if(e.key === 'Enter'){
      e.target.click();
    }
  }

  const onChangeCover = (e: any) => { // HTMLInputElement
    const file = e.target.files[0];
    console.log(file);
    if(file){
      setCoverImage(file);
    }
  }

  const onCancelCover = () => {
    setCoverImage(null);
  }

  const onSave = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log('onSave cropper: ', cropper);
  }

  return (
    <div className="position-relative h-180px overflow-hidden">
      <Dropdown
        drop="down"
        align={{ sm: 'end' }}
        className="position-absolute z-2 right-0 mt-5 mb-5 me-7"
        hidden={!!coverImage?.name}
      >
        <Dropdown.Toggle disabled={disabled} variant="light" bsPrefix="bg-transparent border-0 p-1" id="werkMenuCover">
          <CameraAltIcon color="primary" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow-sm">
          <Dropdown.Item
            as="label"
            tabIndex={0}
            className="cursor-pointer user-select-none"
            onKeyDown={onEnterFile}
          >
            <ImageTwoToneIcon className="me-2" />Choose From gallery
            <input onChange={onChangeCover} type="file" accept=".jpg,.jpeg,.png" hidden />
          </Dropdown.Item>
          <Dropdown.Item as="button" type="button">
            <UnsplashIcon width={15.5} height={15.5} className="d-inline-block ms-1 me-2" />
            Choose From Unsplash
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {coverImage?.name &&
        <>
          <Crop
            inRef={cropperRef}
            src={window.URL.createObjectURL(coverImage)}
            // style={{ height: 180 }} // , width: "100%"
            className="card-img-top overflow-hidden position-relative z-20 bg-light"
            // initialAspectRatio={16 / 9}
            dragMode={"move"}
            minCanvasWidth={940}
            minCanvasHeight={325}
            minCropBoxWidth={180} // Must set Dynamic from container image width
            minCropBoxHeight={180}
            modal={false}
            guides={false}
            center={false}
            highlight={false}
            background={false}
            autoCrop={false}
            rotatable={false}
            zoomable={false}
            zoomOnTouch={false}
            zoomOnWheel={false}
            cropBoxMovable={false}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
          />
          <div className="position-absolute z-30 top-0 right-0 mt-6 me-6 pe-none">
            <Button onClick={onCancelCover} variant="outline-primary" className="btn-outline btn-active-light-primary pe-auto bg-white">Cancel</Button>
            <Button onClick={onSave} className="ms-4 pe-auto">Save</Button>
          </div>
          <div className="position-absolute inset-0 d-grid place-items-center z-30 pe-none">
            <div className="bg-rgba-dark-4 text-white rounded py-2 px-5 fw-semibold">
              <OpenWithTwoToneIcon /> Drag to change the image position
            </div>
          </div>
        </>
      }

      <img
        className={
          Cx("card-img-top object-cover rounded-phone-0 overflow-hidden fs-0 img-loader", coverImage?.name ? 'd-none':'d-grid')
        } //  bg-secondary 
        loading="lazy"
        decoding="async"
        draggable={false}
        height={180}
        alt="Cover"
        src={src}
        onLoad={onLoadCover}
        onError={onLoadCover}
      />
    </div>
  );
}
