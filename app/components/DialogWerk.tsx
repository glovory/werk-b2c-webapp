import { type ReactNode } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//
import { Cx } from '~/utils/dom';

export interface DialogWerkProps extends DialogProps {
  title?: ReactNode | string | any
  stickyHeader?: boolean
  className?: string
  open: boolean
  TransitionProps?: object | any
  onClose?: () => void
  onEnter?: (node: any, isAppearing: boolean) => void
  onEntering?: (node: any, isAppearing: boolean) => void
  onEntered?: (node: any, isAppearing: boolean) => void
  onExit?: (node: any) => void
  onExiting?: (node: any) => void
  onExited?: (node: any) => void
  children?: any
}

/** 
 * ## Docs : 
 * 
 * - [Dialog](https://mui.com/material-ui/api/dialog/)
 * - [Transition](http://reactcommunity.org/react-transition-group/transition)
 * ## 
*/
export default function DialogWerk({
  title,
  stickyHeader = true,
  className,
  open,
  onClose,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  TransitionProps,
  children,
  ...etc
}: DialogWerkProps){
  return (
    <Dialog
      {...etc}
      open={open}
      TransitionProps={{
        ...TransitionProps,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
      }}
      className={Cx("modal-bs", className)}
      onClose={onClose}
    >
      <DialogTitle
        component="div"
        className={
          Cx(
            "py-2 pr-2 flex items-center border-bottom rounded-t-md",
            stickyHeader && "sticky top-0 z-10 bg-white",
          )
        }
      >
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
