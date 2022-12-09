import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import OpenWithTwoToneIcon from '@mui/icons-material/OpenWithTwoTone';

// import { Cx } from '../../utils/dom';
import Crop from '../../components/Crop';
import WerkIcon from '../../svg/werk.svg';

interface Props {
  src?: any;
  loading?: boolean;
  disabled?: boolean;
}

export default function SetAvatar({
  src,
  loading,
  disabled,
}: Props){
  const cropperRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<any>();
  const [cropSrc, setCropSrc] = useState<any>();
  const [cropSaved, setCropSaved] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onEnterFile = (e: any) => {
    if(e.key === 'Enter'){
      e.target.click();
    }
  }

  const onChangeFile = (e: any) => { // HTMLInputElement
    const file = e.target.files[0];
    console.log(file);
    if(file){
      setCropSrc(file);
      setShowModal(true);
    }
  }

  const onCloseModal = () => {
    setShowModal(false);
    setCropSrc(null);
  }

  const cropEnd = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    // console.log('cropEnd cropper: ', cropper);
    setCropSaved(cropper.getCroppedCanvas({ width: 130, height: 130 }).toDataURL());
  }

  const onSaveCrop = () => {
    // console.log('cropSaved: ', cropSaved);
    setImgSrc(cropSaved);
    setShowModal(false);
  }

  return (
    <div
      // className={
      //   Cx("rounded-circle d-grid place-items-center border-white mb-4 mx-auto mx-lg-0 position-relative", !(src || imgSrc) && "w-130px h-130px")
      // }
      className="rounded-circle d-grid place-items-center border-white mb-4 mx-auto mx-lg-0 position-relative w-130px h-130px"
      style={{ backgroundColor: '#cfd9ff', color: '#2f68b1', marginTop: -90, border: '9px solid' }}
    >
      {!loading && (
        src || imgSrc ?
          <img
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="rounded-circle object-cover img-loader"
            alt="Avatar"
            src={imgSrc}
          />
          :
          <WerkIcon width={50} height={50} />
      )}
      
      <Button
        disabled={disabled || loading}
        as="label"
        size="sm"
        variant="light"
        className="bg-transparent border-0 p-1 position-absolute bottom-0 right-auto left-auto mx-auto mb-1"
        onKeyDown={onEnterFile}
      >
        <CameraAltIcon color="primary" />
        <input
          hidden
          type="file"
          accept=".jpg,.jpeg,.png"
          disabled={disabled || loading}
          onChange={onChangeFile}
        />
      </Button>

      <Modal
        centered
        backdrop="static"
        // size="sm"
        show={showModal}
        onHide={onCloseModal}
      >
        <Modal.Header className="py-4 bg-white position-sticky top-0 z-10 shadow-sm" closeButton>
          <Modal.Title>Edit Photo Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="position-relative rounded overflow-hidden w-325px h-325px m-auto d-grid place-items-center" tabIndex={-1}>
            <Crop
              inRef={cropperRef}
              src={cropSrc ? window.URL.createObjectURL(cropSrc) : null}
              // style={{ height: 325, width: 325 }} // 
              className="rounded overflow-hidden" // h-100 m-auto w-325px 
              initialAspectRatio={1 / 1} // 16 / 9
              dragMode={"move"}
              minCanvasWidth={325}
              minCanvasHeight={325}
              minCropBoxWidth={325} // Must set Dynamic from container image width
              minCropBoxHeight={325}
              // modal={false}
              // guides={false}
              // center={false}
              // highlight={false}
              // background={false}
              autoCrop={false}
              rotatable={false}
              zoomable={false}
              zoomOnTouch={false}
              zoomOnWheel={false}
              cropBoxMovable={false}
              cropBoxResizable={false}
              toggleDragModeOnDblclick={false}
              scaleX={1}
              scaleY={1}
              cropend={cropEnd}
            />
            <div className="position-absolute inset-0 d-grid place-items-center z-1 pe-none">
              <div className="bg-rgba-dark-4 text-white rounded py-2 px-5 fw-semibold">
                <OpenWithTwoToneIcon /> Drag to change the image position
              </div>
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer className="py-3">
          <Button onClick={onSaveCrop} className="px-14">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
