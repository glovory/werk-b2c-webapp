import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu'; // , { MenuProps }

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};
const transformOrigin = {
  vertical: 'top',
  horizontal: 'right',
}

export const menuRight = {
  anchorOrigin,
  transformOrigin
};

export const menuLeft = {
  anchorOrigin: {
    ...anchorOrigin,
    horizontal: 'left',
  },
  transformOrigin: {
    ...transformOrigin,
    horizontal: 'left',
  }
};

export default function Dropdown({
  buttonProps,
  label,
  labelAs: LabelAs = Button,
  keepMounted = false,
  mountOnOpen,
  onClose,
  children,
  ...etc
}: any){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [firstRender, setFirstRender] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    (mountOnOpen && !firstRender) && setFirstRender(true);
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
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
        keepMounted={keepMounted || firstRender}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {typeof children === "function" ? children(handleClose) : children}
      </Menu>
    </>
  );
}
