import { useState, useCallback, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Cropper from 'react-easy-crop';
//
import Dropdown from '~/components/Dropdown';
import DialogWerk from '~/components/DialogWerk';
import CameraIcon from '~/svg/Camera';
import MoveIcon from '~/svg/Move';
import { enterToClick, imgLoader } from '~/utils/dom';
import { getCroppedImg } from '~/utils/imageProcessing';
import { INITIAL_BG } from '~/config';

export default function Cover({
  src,
  cropSrc,
  disabled,
  onSave,
  onDelete,
}: any){
  const height = 180;
  const INIT_CROP = { x: 0, y: 0 };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const refParent = useRef();
  const refFile = useRef();
  const [parentWidth, setParentWidth] = useState<any>(760);
  const [fileImage, setFileImage] = useState<any>({});
  const [fileBlob, setFileBlob] = useState<any>();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      const { width } = (refParent.current as any)?.getBoundingClientRect() || {};
      setParentWidth(width);
      setFileImage(file);
      setFileBlob(window.URL.createObjectURL(file));
      setIsEdited(true);
    }
  }

  const doCancel = () => {
    setFileImage({});
    setFileBlob(null);
    setCrop(INIT_CROP);
    setIsEdited(false);
    // Reset input file
    const inputFile = refFile.current as any;
    if(inputFile?.value){
      inputFile.value = "";
    }
  }

  const onCropComplete = useCallback((cropArea: any, cropAreaPx: any) => {
    setCroppedAreaPixels(cropAreaPx);
  }, [])

  const doSave = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(fileBlob, croppedAreaPixels);
      // console.log('saveFile croppedImage: ', croppedImage);
      onSave?.(croppedImage, fileImage);
      doCancel();
    } catch (e) {
      console.error(e)
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
    // onDelete?.();
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const openModalCrop = (close: any) => {
    close();
    if(cropSrc){
      const { width } = (refParent.current as any)?.getBoundingClientRect() || {};
      setParentWidth(width);
      // setFileImage(file);
      setFileBlob(cropSrc);
      setIsEdited(true);
    }
  }

  const renderMenus = (close: any) => {
    let fix = [
      <MenuItem key="1" component="label" onClick={close} onKeyDown={enterToClick}>
        <ImageTwoToneIcon className="mr-2" />Choose From Gallery
        <input ref={refFile as any} onChange={onChangeFile} type="file" accept=".jpg,.jpeg,.png" hidden />
      </MenuItem>,
      <MenuItem key="2" onClick={close}>
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
      ref={refParent as any}
      className="relative select-none"
    >
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

      {fileBlob &&
        <>
          <div className="absolute top-0 right-0 mt-3 mr-3">
            <Button onClick={doCancel} variant="outlined" color="primary" className="min-w-80 border-blue-500 bg-white hover:bg-blue-200 mr-3">Cancel</Button>
            <Button onClick={doSave} variant="contained" className="min-w-80">Save</Button>
          </div>

          <div className="absolute inset-0 flex pointer-events-none">
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

      {/* <Dialog
        open={openConfirm}
        onClose={closeConfirm}
        aria-labelledby="dialog-remove-background"
      >
        <DialogTitle id="dialog-remove-background">
          Are you sure want to delete this background?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirm}>No</Button>
          <Button onClick={() => onDelete?.(closeConfirm)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}

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
    </div>
  );
}
