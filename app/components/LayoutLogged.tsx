import type { ReactNode } from "react";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Link } from "@remix-run/react";

import FooterMain from './FooterMain';

interface Props {
  children?: ReactNode,
}

const USER_MENU = ['Account Setting', 'Sign Out'];
const LANGUAGE = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
];

export default function LayoutLogged({
  children,
}: Props){
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>('en');

  const languageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  }

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const menuPosition = {
    sx: { mt: '30px' },
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    }
  };

  return (
    <>
      <AppBar
        enableColorOnDark
        elevation={0}
        color="default"
        variant="outlined"
        position="sticky"
        sx={{
          borderBottom: '1px solid #dedede',
        }}
      >
        <Container>
          <Toolbar
            variant="dense"
            className="px-0"
          >
            <Link to="/">
              <Avatar
                sx={{ width: 32, height: 32 }}
                className="align-middle"
                src="/image/werk-logo-symbol-space.svg"
                alt="Werk"
              />
            </Link>

            <Box className="flex items-center ml-auto">
              <FormControl
                variant="standard"
                size="small"
                className="my-0 mr-5"
                sx={{ minWidth: 72 }}
              >
                <Select
                  renderValue={(val) => (
                    <div className="flex items-center uppercase">
                      <Avatar
                        sx={{ width: 20, height: 20 }}
                        variant="square"
                        alt={val}
                        src={`/image/flags/${val === 'en' ? 'us' : val}.svg`}
                        className="mr-2"
                      />
                      {val}
                    </div>
                  )}
                  value={language}
                  onChange={languageChange}
                  displayEmpty
                  IconComponent={ExpandMoreTwoToneIcon}
                  // @ts-ignore:next-line
                  MenuProps={menuPosition}
                  // inputProps={{ 'aria-label': 'Without label' }}
                >
                  {LANGUAGE.map((lang) => 
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <IconButton onClick={handleOpenUserMenu} className="p-0">
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt="John Doe"
                  src="/image/misc/user_1.png"
                />
              </IconButton>
              {/* @ts-ignore:next-line */}
              <Menu
                {...menuPosition}
                id="account-menu"
                anchorEl={anchorElUser}
                // keepMounted
                open={!!anchorElUser}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Avatar
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                    alt="John Doe"
                    src="/image/misc/user_1.png"
                    className="mr-3"
                  />
                  <div>
                    John Doe
                    <div className="text-xs">johndoe@gmail.com</div>
                  </div>
                </MenuItem>
                <hr />

                {USER_MENU.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="flex flex-col min-h-calc-nav">
        {children}

        <FooterMain />
      </div>
    </>
  );
}
