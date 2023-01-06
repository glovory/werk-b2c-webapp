import { useState, useCallback } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar'; // , { SnackbarOrigin }
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Cropper from 'react-easy-crop';
//
import WerkLogo from '~/svg/werk';
import MoveIcon from '~/svg/Move';
import DialogWerk from '~/components/DialogWerk';
import { Cx, imgLoader } from '~/utils/dom';
import { getCroppedImg } from '~/utils/imageProcessing';
import { isImage } from '~/utils/typeChecking';

interface AvatarSetupProps {
  src?: string
  cropSrc?: string
  alt?: string
  className?: any
  style?: any
  disabled?: boolean
  loading?: boolean
  avatarProps?: any
  iconProps?: any
  onSave?: (crop: any, original: any) => void
  onDelete?: (val: any) => void
  onCloseModalView?: () => void
  openModalView?: boolean
  label?: any
  inputRef?: any
  children?: any
}

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
  onDelete,
  openModalView,
  onCloseModalView,
  label,
  inputRef,
  children,
}: AvatarSetupProps){
  const myAlt = alt || "Avatar";
  const INIT_CROP = { x: 0, y: 0 };
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileInput, setFileInput] = useState<any>();
  const [fileBlob, setFileBlob] = useState<any>();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loadingCrop, setLoadingCrop] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const resetFile = (e?: any) => {
    const inputFile = (e?.target || inputRef?.current) as any;
    if(inputFile?.value){ // Reset input file
      inputFile.value = "";
    }
  }

  const onCloseModal = () => {
    setOpenModal(false);
    setCrop(INIT_CROP);
    resetFile(); // Reset input file
  }

  const onChangeFile = async (e: any) => {
    const file = e.target.files[0];
    if(file){
      const imgSrc: any = await isImage(file); // , ACCEPT_FILE
      if(imgSrc){
        setFileInput(file);
        setFileBlob(imgSrc); // window.URL.createObjectURL(file)
        setOpenModal(true);
      }else{
        resetFile(e); // Reset input file
        setToastOpen(true);
      }
    }
  }

  const onCropComplete = useCallback((cropArea: any, cropAreaPx: any) => {
    setCroppedAreaPixels(cropAreaPx);
  }, [])

  const saveFile = useCallback(async () => {
    setLoadingCrop(true);
    try {
      const croppedImage = await getCroppedImg(fileBlob, croppedAreaPixels);
      // console.log('saveFile croppedImage: ', croppedImage);
      onSave?.(croppedImage, fileInput);
      onCloseModal();
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingCrop(false);
    }
  }, [croppedAreaPixels]);

  const openModalCrop = () => {
    if(cropSrc){
      setOpenModal(true);
      setFileBlob(cropSrc);
    }
  }

  const openConfirmDelete = () => {
    setOpenConfirm(true);
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const closeToast = () => {
    setToastOpen(false);
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

        {typeof children === 'function' ? children({ onChangeFile, openModalCrop, openConfirmDelete, disabled }) : children}
      </div>

      {typeof label === 'function' ? label(onChangeFile, disabled) : null}

      <DialogWerk
        title="Edit Photo Profile"
        fullScreen={isFullScreen}
        fullWidth
        scroll="body"
        open={openModal}
        onClose={disabled ? undefined : onCloseModal}
      >
        <div className="p-4">
          {(fileBlob || src) && (
            <div tabIndex={-1} className="w-80 h-80 mx-auto rounded-lg overflow-hidden relative cropper">
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
                  ...imgLoader(),
                  draggable: false,
                }}
                image={fileBlob || cropSrc}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />

              <div className={`absolute inset-0 flex ${loadingCrop ? 'bg-gray-500/30 text-white cursor-wait' : 'pointer-events-none'}`}>
                {loadingCrop && <CircularProgress color="inherit" className="absolute inset-0 m-auto z-2" />}

                <b className="text-white bg-gray-700/60 m-auto py-1 px-4 rounded-md text-xs shadow-sm">
                  <MoveIcon className="align-middle mr-2" />
                  Drag to change the image position
                </b>
              </div>
            </div>
          )}
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <LoadingButton
            loading={loadingCrop}
            onClick={saveFile}
            size="large"
            variant="contained"
            className="px-7 w-btn-loading"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </DialogWerk>

      <DialogWerk
        title="Profile Photo"
        fullScreen={isFullScreen}
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

      <DialogWerk
        title="Delete Photo"
        fullWidth
        maxWidth="xs"
        scroll="body"
        open={openConfirm}
        // onClose={processForm ? undefined : closeConfirm}
        onClose={closeConfirm}
      >
        <div className="p-6">
          Are you sure want to delete this photo?
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <Button
            size="large"
            color="error"
            variant="contained"
            className="px-6"
            onClick={() => onDelete?.(closeConfirm)}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogWerk>

      <Snackbar
        key="toastErrorAvatarFile"
        autoHideDuration={2e3}
        // disableWindowBlurListener
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={closeToast}
        message="Please insert image file"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={closeToast}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}
