import Dialog from '@mui/material/Dialog'; // , { DialogProps }
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Cx } from '~/utils/dom';

export default function DialogWerk({
  title,
  className,
  onClose,
  children,
  ...etc
}: any){
  return (
    <Dialog
      {...etc}
      // fullScreen={fullScreen}
      // fullWidth
      // maxWidth="lg"
      // scroll="body"
      className={Cx("modal-bs", className)}
      onClose={onClose}
    >
      <DialogTitle className="py-2 pr-2 flex items-center border-bottom sticky top-0 z-10 bg-white rounded-t-md">
        {title}
        
        <IconButton
          disabled={!onClose}
          onClick={onClose}
          className="ml-auto"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      {children}
    </Dialog>
  );
}
