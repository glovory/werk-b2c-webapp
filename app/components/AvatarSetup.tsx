import { useState } from 'react';
import Dialog from '@mui/material/Dialog'; // , { DialogProps }
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import CloseIcon from '@mui/icons-material/Close';

import WerkLogo from '~/svg/Werk';
import { Cx, enterToClick } from '~/utils/dom';

export default function AvatarSetup({
  src,
  alt,
  className,
  style,
  disabled,
  loading,
  onSave,
}: any){
  const myAlt = alt || "Avatar";
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileImage, setFileImage] = useState<any>();

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setFileImage(file);
      setOpenModal(true);
    }
  }

  const saveFile = () => {
    onCloseModal();
    onSave?.(window.URL.createObjectURL(fileImage));
  }

  return (
    <div
      className={
        Cx(
          "grid place-items-center rounded-full relative w-140 h-140",
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
            sx={{ width: 120, height: 120 }}
            src={src}
            alt={myAlt}
            imgProps={{
              loading: "lazy",
              decoding: "async",
              draggable: false,
            }}
          />
          :
          <WerkLogo width={60} height={60} className="text-blue-700" />
      }
      
      <Button
        disabled={disabled}
        component="label"
        className="min-w-0 p-1 rounded-full hover:bg-white absolute bottom-0"
        onKeyDown={enterToClick}
      >
        <CameraAltTwoToneIcon fontSize="small" />
        <input onChange={onChangeFile} disabled={disabled} type="file" accept=".jpg,.jpeg,.png" hidden />
      </Button>

      <Dialog
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
        <div className="p-4 text-center">
          {(fileImage || src) &&
            <img
              width={320}
              height={320}
              className="object-cover rounded-md" // w-80
              alt={myAlt}
              src={fileImage?.name ? window.URL.createObjectURL(fileImage) : src}
            />
          }
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <Button onClick={saveFile} size="large" variant="contained" className="px-7">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
