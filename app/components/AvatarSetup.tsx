import { useState, useCallback } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Cropper from 'react-easy-crop';

import WerkLogo from '~/svg/werk';
import MoveIcon from '~/svg/Move';
import DialogWerk from '~/components/DialogWerk';
import { Cx, imgLoader } from '~/utils/dom';
import { getCroppedImg } from '~/utils/imageProcessing';

export default function AvatarSetup({
  src,
  cropSrc,
  alt,
  className,
  style,
  disabled,
  loading,
  avatarProps,
  iconProps,
  onSave,
  openModalView,
  onCloseModalView,
  label,
  inputRef,
  children,
}: any){
  const myAlt = alt || "Avatar";
  const INIT_CROP = { x: 0, y: 0 };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileInput, setFileInput] = useState<any>();
  const [fileBlob, setFileBlob] = useState<any>();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCloseModal = () => {
    setOpenModal(false);
    setCrop(INIT_CROP);
    // Reset input file
    const inputFile = inputRef?.current as any;
    if(inputFile?.value){
      inputFile.value = "";
    }
  }

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setFileInput(file);
      setFileBlob(window.URL.createObjectURL(file));
      setOpenModal(true);
    }
  }

  const onCropComplete = useCallback((cropArea: any, cropAreaPx: any) => {
    setCroppedAreaPixels(cropAreaPx);
  }, [])

  const saveFile = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(fileBlob, croppedAreaPixels);
      // console.log('saveFile croppedImage: ', croppedImage);
      onSave?.(croppedImage, fileInput);
      onCloseModal();
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels]);

  const openModalCrop = () => {
    setOpenModal(true);
    setFileBlob(cropSrc);
  }

  return (
    <>
      <div
        className={
          Cx(
            "grid place-items-center rounded-full relative",
            (!src || loading) && 'bg-w-blue-1',
            className
          )
        }
        style={style}
      >
        {loading ?
          <Skeleton animation="wave" variant="circular" width={120} height={120} />
          :
          src ?
            <Avatar
              {...avatarProps}
              src={src}
              alt={myAlt}
              imgProps={{
                ...imgLoader(),
                loading: "lazy",
                decoding: "async",
                draggable: false,
              }}
            />
            :
            <WerkLogo {...iconProps} className="text-blue-700" />
        }

        {typeof children === 'function' ? children(onChangeFile, openModalCrop, disabled) : children}
      </div>

      {typeof label === 'function' ? label(onChangeFile, disabled) : null}

      <DialogWerk
        title="Edit Photo Profile"
        fullScreen={fullScreen}
        fullWidth
        scroll="body"
        className="modal-bs"
        open={openModal}
        onClose={disabled ? undefined : onCloseModal}
      >
        <div className="p-4">
          {(fileBlob || src) &&
            <div className="w-80 h-80 mx-auto rounded-lg overflow-hidden relative cropper" tabIndex={-1}>
              <Cropper
                objectFit="horizontal-cover"
                showGrid={false}
                cropShape="round"
                aspect={1 / 1}
                cropSize={{
                  height: 320,
                  width: 320,
                }}
                mediaProps={{
                  draggable: false,
                }}
                image={fileBlob || cropSrc} // src
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />

              <div className="absolute inset-0 flex pointer-events-none select-none">
                <b className="text-white bg-gray-700/60 m-auto py-1 px-4 rounded-md text-xs shadow-sm">
                  <MoveIcon className="align-middle mr-2" />
                  Drag to change the image position
                </b>
              </div>
            </div>
          }
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <Button onClick={saveFile} size="large" variant="contained" className="px-7">Save</Button>
        </DialogActions>
      </DialogWerk>

      <DialogWerk
        title="Profile Photo"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
        scroll="body"
        open={!!openModalView}
        onClose={onCloseModalView}
      >
        <div className="p-6 text-center">
          <img
            {...imgLoader("md:w-2/4 h-auto rounded-md")}
            src={src}
            alt="Avatar"
            draggable={false}
          />
        </div>
      </DialogWerk>
    </>
  );
}
