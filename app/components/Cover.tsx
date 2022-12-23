import { useState } from 'react';
// import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import OpenWithTwoToneIcon from '@mui/icons-material/OpenWithTwoTone';

import Dropdown from '~/components/Dropdown';
import Background from '~/components/Background';
import { enterToClick } from '~/utils/dom';

export default function Cover({
  src,
  disabled,
  onSave,
}: any){
  const [fileImage, setFileImage] = useState<any>({});

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setFileImage(file);
    }
  }

  const doCancel = () => {
    setFileImage({});
  }

  const doSave = () => {
    doCancel();
    onSave?.(fileImage);
  }

  return (
    <Background
      className="relative bg-no-repeat bg-cover"
      style={{
        height: 180,
        backgroundPosition: 'center',
      }}
      src={fileImage.name ? window.URL.createObjectURL(fileImage) : src}
    >
      {(loadBg: any) => 
        <>
          <Dropdown
            keepMounted
            disableAutoFocusItem
            label={<CameraAltTwoToneIcon />}
            buttonProps={{
              disabled: !loadBg || disabled,
              hidden: !!fileImage.name,
              className: "min-w-0 p-1 rounded-full absolute md:top-4 max-md:bottom-4 right-4 z-1 hover:bg-white"
            }}
          >
            {(close: any) => 
              [
                <MenuItem key="1" component="label" onClick={close} onKeyDown={enterToClick}>
                  <ImageTwoToneIcon className="mr-2" />Choose From Gallery
                  <input onChange={onChangeFile} type="file" accept=".jpg,.jpeg,.png" hidden />
                </MenuItem>,
                <MenuItem key="2" onClick={close}>
                  <img src="/image/brand/unsplash.svg" alt="Unsplash" width="15.5" className="ml-1 mr-2" />
                  Choose From Unsplash
                </MenuItem>
              ]
            }
          </Dropdown>

          {fileImage.name &&
            <>
              <div className="absolute top-0 right-0 mt-3 mr-3">
                <Button onClick={doCancel} variant="outlined" color="primary" className="min-w-80 border-blue-500 bg-white hover:bg-blue-200 mr-3">Cancel</Button>
                <Button onClick={doSave} variant="contained" className="min-w-80">Save</Button>
              </div>

              <div className="absolute inset-0 flex pointer-events-none">
                <b className="text-white bg-slate-700 m-auto py-2 px-4 rounded-md text-xs">
                  <OpenWithTwoToneIcon fontSize="small" className="align-middle mr-2" />
                  Drag to change the image position
                </b>
              </div>
            </>
          }
        </>
      }
    </Background>
  );
}
