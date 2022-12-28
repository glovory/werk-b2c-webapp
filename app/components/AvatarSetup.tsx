import { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog'; // , { DialogProps }
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import OpenWithTwoToneIcon from '@mui/icons-material/OpenWithTwoTone';
import Cropper from 'react-easy-crop';

import WerkLogo from '~/svg/Werk';
import { Cx } from '~/utils/dom';
import { getCroppedImg } from '~/utils/imageProcessing';

export default function AvatarSetup({
  src,
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
  children,
}: any){
  const myAlt = alt || "Avatar";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileInput, setFileInput] = useState<any>();
  const [fileBlob, setFileBlob] = useState<any>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCloseModal = () => {
    setOpenModal(false);
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
    } catch (e) {
      console.error(e)
    }

    onCloseModal();
  }, [croppedAreaPixels]);

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
                loading: "lazy",
                decoding: "async",
                draggable: false,
              }}
            />
            :
            <WerkLogo {...iconProps} className="text-blue-700" />
        }

        {typeof children === 'function' ? children(onChangeFile, disabled) : children}
      </div>

      {typeof label === 'function' ? label(onChangeFile, disabled) : null}

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        scroll="body"
        className="modal-bs"
        open={openModal}
        onClose={disabled ? undefined : onCloseModal}
      >
        <DialogTitle  className="py-2 pr-2 flex items-center border-bottom">
          Edit Photo Profile
          <IconButton
            onClick={onCloseModal}
            disabled={disabled}
            className="ml-auto"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
                image={fileBlob || src}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />

              <div className="absolute inset-0 flex pointer-events-none">
                <b className="text-white bg-gray-700/60 m-auto py-1 px-4 rounded-md text-xs shadow-sm">
                  <OpenWithTwoToneIcon sx={{ fontSize: 20 }} className="align-middle mr-2" />
                  Drag to change the image position
                </b>
              </div>
            </div>
          }
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <Button onClick={saveFile} size="large" variant="contained" className="px-7">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
        scroll="body"
        className="modal-bs"
        open={openModalView}
        onClose={onCloseModalView}
      >
        <DialogTitle className="py-2 pr-2 flex items-center border-bottom">
          Background Photo
          <IconButton
            onClick={onCloseModalView}
            className="ml-auto"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className="p-6 text-center">
          <img src={src} alt="Bg" className="md:w-2/4 h-auto rounded-md" draggable={false} />
        </div>
      </Dialog>
    </>
  );
}
