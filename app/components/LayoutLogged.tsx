import type { ReactNode } from "react";
import { useState, useEffect } from "react";
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
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Skeleton from '@mui/material/Skeleton';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Link } from "@remix-run/react";
// import { useLogout } from "@pankod/refine-core"; // useGetIdentity, 
import { useNavigate } from "@remix-run/react";

import { account, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";
import { authProvider } from '~/authProvider';
import FooterMain from './FooterMain';

interface Props {
  footer?: boolean | any,
  children?: ReactNode,
}

const LANGUAGE = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
];

export default function LayoutLogged({
  footer = true,
  children,
}: Props){
  // const { data: identity } = useGetIdentity<any>();
  // const { mutate: logout } = useLogout<string>();
  const navigate = useNavigate();
  const [identity, setIdentity] = useState<any>();
  const [loadingIdentity, setLoadingIdentity] = useState(false);
  const [loadingLoginWith, setLoadingLoginWith] = useState<any>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    account.get()
      .then(user => {
        setIdentity(user);
      })
      .catch(() => {
        // console.log('e: ', e);
      })
      .finally(() => setLoadingIdentity(true));
  }, []);

  const signinWith = (provider: string) => {
    setLoadingLoginWith(provider); // true | provider

    // window.open('', 'Sign in - Google Account', `left=${(screen.width - 496) / 2},top=${(screen.height - 574) / 4},width=496,height=574`);
    // "https://staging.business.werk.id/v1/auth/oauth2/success", "https://staging.business.werk.id/v1/auth/oauth2/failure"
    account.createOAuth2Session(provider, REDIRECT_SUCCESS, REDIRECT_FAILURE);
  }

  const languageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  }

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const onLogout = async () => {
    handleCloseUserMenu();
    // logout("/");
    const req: any = await authProvider.logout("/");
    if(req){
      setIdentity(null);
      navigate(req.redirectPath, { replace: true });
    }
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
          <Toolbar variant="dense" className="px-0">
            <Link to="/">
              <img
                src="/image/logo/werk-logo-symbol.svg" // "/image/werk-logo-symbol-space.svg"
                alt="Werk"
              />
            </Link>

            <Box className="flex items-center ml-auto">
              {loadingIdentity ?
                (
                  identity ?
                    <>
                      <FormControl
                        variant="standard"
                        size="small"
                        className="mr-5"
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
                        {/* {identity.avatar ?
                          <Avatar
                            sx={{ width: 32, height: 32 }}
                            alt={identity.name}
                            src={identity.avatar} // "/image/misc/user_1.png"
                          />
                          :
                          <div className="grid place-items-center rounded-full w-8 h-8" style={{ backgroundColor: '#cfd9ff' }}>
                            <img width="20" height="20" src="/image/werk-logo-symbol-line.svg" alt="Avatar" />
                          </div>
                        } */}
                        
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          alt={identity.name}
                          src={identity.avatar}
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
                        MenuListProps={{
                          className: "min-w-[275px]",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to={"/profile/" + identity.$id}
                          onClick={handleCloseUserMenu}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{ width: 48, height: 48 }}
                            alt={identity.name}
                            src={identity.avatar} // "/image/misc/user_1.png"
                            className="mr-3"
                          />
                          <div>
                            <b className="font-medium">{identity.name}</b>
                            <div className="text-xs">{identity.email}</div>
                          </div>
                        </MenuItem>
                        <hr className="my-3" />

                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Account Setting</Typography>
                        </MenuItem>
                        <MenuItem onClick={onLogout}>
                          <Typography textAlign="center">Sign Out</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                    :
                    <div className="flex flex-row items-center gap-3">
                      {/* <Button
                        component={Link}
                        to="/signup"
                        disabled={!!loadingLoginWith}
                        color="secondary"
                        className="mr-3"
                      >
                        Sign up
                      </Button> */}

                      <div>Continue with</div>
                      <LoadingButton
                        variant="outlined"
                        className="min-w-0"
                        disabled={!!loadingLoginWith}
                        loading={loadingLoginWith === 'google'}
                        onClick={() => signinWith("google")}
                      >
                        <img
                          width={18}
                          height={18}
                          alt="Google Logo"
                          src="/image/brand/google.svg"
                        />
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        color="secondary"
                        className="min-w-0"
                        disabled={!!loadingLoginWith}
                        // loading={loadingLoginWith}
                        // onClick={() => signinWith("apple")}
                      >
                        <img
                          width={18}
                          height={18}
                          alt="Apple Logo"
                          src="/image/brand/apple.svg"
                        />
                      </LoadingButton>
                    </div>
                )
                :
                <Typography component="div" variant="h4" className="w-60">
                  <Skeleton />
                </Typography>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="flex flex-col min-h-calc-nav">
        {children}

        {footer && <FooterMain />}
      </div>
    </>
  );
}
