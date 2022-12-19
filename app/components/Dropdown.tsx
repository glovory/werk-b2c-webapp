import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu'; // , { MenuProps }

export const menuRight = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  }
};

export default function Dropdown({
  buttonProps,
  label,
  labelAs: LabelAs = Button,
  // open,
  children,
  ...etc
}: any){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <LabelAs
        {...buttonProps}
        // aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl}
        onClick={handleClick}
      >
        {label}
      </LabelAs>

      <Menu
        {...menuRight}
        {...etc}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {typeof children === "function" ? children(handleClose) : children}
      </Menu>
    </>
  );
}
