import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu'; // , { MenuProps }

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
