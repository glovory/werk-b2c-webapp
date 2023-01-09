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

export const menuCenter = {
  anchorOrigin: {
    ...anchorOrigin,
    horizontal: 'center',
  },
  transformOrigin: {
    ...transformOrigin,
    horizontal: 'center',
  }
};

/** 
 * ## Docs : 
 * 
 * - [Menu](https://mui.com/material-ui/api/menu/)
 * - [MenuItem](https://mui.com/material-ui/api/menu-item/)
 * - [Button](https://mui.com/material-ui/api/button/)
 * ## 
*/
export default function Dropdown({
  buttonProps,
  label,
  labelAs: LabelAs = Button,
  keepMounted = false,
  mountOnOpen = true, // Custom for render first open, next toggle hide
  onClose,
  children,
  ...etc
}: any){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [firstRender, setFirstRender] = useState<boolean>(false);

  const doClick = (e: React.MouseEvent<HTMLElement>) => {
    (mountOnOpen && !firstRender) && setFirstRender(true);
    setAnchorEl(e.currentTarget);
  }

  const doClose = () => {
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
        onClick={doClick}
      >
        {label}
      </LabelAs>

      <Menu
        {...menuRight}
        {...etc}
        keepMounted={keepMounted || firstRender}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={doClose}
      >
        {typeof children === "function" ? children(doClose) : children}
      </Menu>
    </>
  );
}
