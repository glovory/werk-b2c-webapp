import { useState, useCallback, useRef, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar'; // , { SnackbarOrigin }
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Cropper from 'react-easy-crop';
//
import Dropdown from '~/components/Dropdown';
import DialogWerk from '~/components/DialogWerk';
import ModalGallery from '~/components/unsplash';
import CameraIcon from '~/svg/Camera';
import MoveIcon from '~/svg/Move';
import { enterToClick, imgLoader } from '~/utils/dom';
import { getCroppedImg } from '~/utils/imageProcessing';
import { isImage } from '~/utils/typeChecking';
import { INITIAL_BG, ACCEPT_FILE } from '~/config';

interface CoverProps {
  src?: string
  cropSrc?: string
  hide?: boolean
  disabled?: boolean
  onSave?: (crop: any, original: any) => void
  onDelete?: (val: any) => void
}

export default function Cover({
  src,
  cropSrc,
  hide,
  disabled,
  onSave,
  onDelete,
}: CoverProps){
  const height = 180;
  const INIT_CROP = { x: 0, y: 0 };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const refParent: any = useRef();
  const refFile: any = useRef();
  const refControllerUnsplash: any = useRef();
  const [parentWidth, setParentWidth] = useState<any>(760);
  const [fileImage, setFileImage] = useState<any>({});
  const [fileBlob, setFileBlob] = useState<any>();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loadingCrop, setLoadingCrop] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [openUnsplashModal, setOpenUnsplashModal] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if(refControllerUnsplash.current){
        refControllerUnsplash.current.abort();
      }
    }
  }, [refControllerUnsplash.current]);

  const resetFile = (e?: any) => {
    const inputFile = e?.target || refFile?.current;
    if(inputFile?.value){ // Reset input file
      inputFile.value = "";
    }
  }

  const setCropSize = () => {
    const { width } = refParent.current?.getBoundingClientRect() || {};
    setParentWidth(width);
  }

  const onChangeFile = async (e: any) => {
    const file = e.target.files[0];
    if(file){
      const imgSrc: any = await isImage(file); // , ACCEPT_FILE
      if(imgSrc){
        setCropSize();
        setFileImage(file);
        setFileBlob(imgSrc); // window.URL.createObjectURL(file)
        setIsEdited(true);
      }else{
        resetFile(e); // Reset input file
        setToastOpen(true);
      }
    }
  }

  const doCancel = () => {
    setFileImage({});
    setFileBlob(null);
    setCrop(INIT_CROP);
    setIsEdited(false);
    resetFile(); // Reset input file
  }

  const onCropComplete = useCallback((cropArea: any, cropAreaPx: any) => {
    setCroppedAreaPixels(cropAreaPx);
  }, [])

  const doSave = useCallback(async () => {
    setLoadingCrop(true);
    try {
      const croppedImage = await getCroppedImg(fileBlob, croppedAreaPixels);
      // console.log('saveFile croppedImage: ', croppedImage);
      onSave?.(croppedImage, fileImage);
      doCancel();
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingCrop(false);
    }
  }, [croppedAreaPixels])

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const viewPhoto = (close: any) => {
    close();
    setOpenModal(true);
  }

  const openConfirmDelete = (close: any) => {
    close();
    setOpenConfirm(true);
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const closeToast = () => {
    setToastOpen(false);
  }

  const openModalCrop = (close: any) => {
    close();
    if(cropSrc){
      setCropSize();
      setFileBlob(cropSrc);
      setIsEdited(true);
    }
  }

  const openUnsplash = (close?: any) => {
    close();
    setOpenUnsplashModal(true);
  }

  const onClickImageUnsplash = (item: any) => {
    console.log('onClickImageUnsplash item: ', item);
    setCropSize();
    setFileBlob(item?.urls?.full); // full | raw | regular | small | small_s3 | thumb
    setOpenUnsplashModal(false);
    setIsEdited(true);
  }

  const fetchUnsplash = (controller: any) => {
    refControllerUnsplash.current = controller;
  }

  const doneFetch = () => {
    refControllerUnsplash.current = null;
  }

  const renderMenus = (close: any) => {
    let fix = [
      <MenuItem key="1" component="label" onClick={close} onKeyDown={enterToClick}>
        <ImageTwoToneIcon className="mr-2" />Choose From Gallery
        <input ref={refFile} onChange={onChangeFile} type="file" accept={ACCEPT_FILE} hidden />
      </MenuItem>,
      <MenuItem key="2" onClick={() => openUnsplash(close)}>
        <img src="/image/brand/unsplash.svg" alt="Unsplash" width="15.5" className="ml-1 mr-3" />
        Choose From Unsplash
      </MenuItem>
    ];
    
    if(src !== INITIAL_BG){
      fix = [
        <MenuItem key="v" onClick={() => viewPhoto(close)}>
          <VisibilityTwoToneIcon className="mr-2" />View Photo
        </MenuItem>,
        ...fix,
        <MenuItem key="c" onClick={() => openModalCrop(close)}>
          <MoveIcon width={18} height={18} className="ml-1 mr-3" />Change Position
        </MenuItem>,
        <hr key="h" className="my-2" />,
        <MenuItem key="d" onClick={() => openConfirmDelete(close)}>
          <DeleteTwoToneIcon className="mr-2" />Delete Photo
        </MenuItem>,
      ];
    }
    return fix;
  }

  return (
    <div
      ref={refParent}
      className="relative select-none"
    >
      <ModalGallery
        open={openUnsplashModal}
        onClose={() => setOpenUnsplashModal(false)} // onCloseModalUnsplash
        onClickImage={onClickImageUnsplash}
        onFetch={fetchUnsplash}
        onDoneFetch={doneFetch}
      />

      {(fileBlob || cropSrc) && isEdited &&
        <div className="relative cropper" style={{ height }} tabIndex={-1}>
          <Cropper
            classes={{
              cropAreaClassName: "border-transparent shadow-none",
            }}
            objectFit="horizontal-cover" // horizontal-cover | vertical-cover | contain | auto-cover
            showGrid={false}
            // aspect={21 / 9}
            cropSize={{
              height,
              width: parentWidth, // Must Calc from parent width
            }}
            mediaProps={{
              ...imgLoader(),
              draggable: false,
            }}
            image={fileBlob || cropSrc} // fileBlob || src
            crop={crop}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>
      }

      <img
        // {...imgLoader("w-full object-cover text-0")}
        className="w-full object-cover text-0"
        hidden={!!fileBlob}
        height={height}
        loading="lazy"
        decoding="async"
        draggable={false}
        alt="Background"
        src={src}
      />

      {!hide &&
        <Dropdown
          mountOnOpen // keepMounted
          disableAutoFocusItem
          label={<CameraIcon />}
          buttonProps={{
            disabled,
            hidden: !!fileBlob,
            className: "min-w-0 p-1 rounded-full absolute md:top-4 max-md:bottom-4 right-4 z-1 hover:bg-white"
          }}
        >
          {renderMenus}
        </Dropdown>
      }

      {fileBlob &&
        <>
          <div className="absolute top-0 right-0 mt-3 mr-3">
            <Button
              disabled={loadingCrop}
              onClick={doCancel}
              variant="outlined"
              color="primary"
              className="min-w-80 border-blue-500 bg-white hover:bg-blue-200 mr-3"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loadingCrop}
              onClick={doSave}
              variant="contained"
              className="min-w-80 w-btn-loading"
            >
              Save
            </LoadingButton>
          </div>

          <div className={`absolute inset-0 flex ${loadingCrop ? 'bg-gray-500/30 text-white cursor-wait' : 'pointer-events-none'}`}>
            {loadingCrop && <CircularProgress color="inherit" className="absolute inset-0 m-auto z-2" />}

            <b className="text-white bg-gray-700/60 m-auto py-1 px-4 rounded-md text-xs shadow-sm">
              <MoveIcon className="align-middle mr-2" />
              Drag to change the image position
            </b>
          </div>
        </>
      }

      <DialogWerk
        title="Background Photo"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
        scroll="body"
        open={openModal}
        onClose={onCloseModal}
      >
        <div className="p-6">
          <img
            {...imgLoader("w-full h-auto rounded-md")}
            src={src}
            alt="Bg"
            draggable={false}
          />
        </div>
      </DialogWerk>

      <DialogWerk
        title="Delete Background"
        fullWidth
        maxWidth="xs"
        scroll="body"
        open={openConfirm}
        // onClose={processForm ? undefined : closeConfirm}
        onClose={closeConfirm}
      >
        <div className="p-6">
          Are you sure want to delete this background?
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
        key="toastErrorBgFile"
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
    </div>
  );
}
