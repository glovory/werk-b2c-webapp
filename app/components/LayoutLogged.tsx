import { useState, useEffect, ReactNode } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Link } from "@remix-run/react";
import { useGetIdentity } from "@pankod/refine-core"; // useGetIdentity, useLogout
import { useNavigate } from "@remix-run/react";

import { account, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";
import { authProvider } from '~/authProvider';
import FooterMain from './FooterMain';
import Dropdown, { menuRight } from "./Dropdown";
import WerkLogo from '~/svg/werk';

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
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();
  // const { mutate: logout } = useLogout<string>();
  const navigate = useNavigate();
  const [identity, setIdentity] = useState<any>();
  // const [isLoading, setIsLoading] = useState(true);
  const [loadingSignin, setLoadingSignin] = useState(false);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // account.get()
    //   .then(user => {
    //     setIdentity(user);
    //   })
    //   .catch(() => {
    //     // console.log('e: ', e);
    //   })
    //   .finally(() => setIsLoading(false));

    // console.log('userData: ', userData);
    setIdentity(!isLoading && userData && isSuccess ? userData : null);
  }, [userData, isSuccess, isLoading]);

  const languageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  }

  const signinWith = (provider: string) => {
    setLoadingSignin(true);
    account.createOAuth2Session(provider, REDIRECT_SUCCESS, REDIRECT_FAILURE);
  }

  const onLogout = async (close: any) => {
    close();
    setLoadingSignin(true);
    // logout("/");

    const req: any = await authProvider.logout("/");
    if(req){
      setIdentity(null); // Clear Auth
      setLoadingSignin(false);
      // Redirect if not same with current pathname
      if(req !== window.location.pathname){
        navigate(req, { replace: true });
      }
    }
  }

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
                src="/image/logo/werk-logo-symbol.svg"
                alt="Werk"
              />
            </Link>

            <Box className="flex items-center ml-auto">
              {isLoading ?
                <Typography component="div" variant="h4" className="w-60">
                  <Skeleton />
                </Typography>
                :
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
                      MenuProps={{
                        ...menuRight,
                        sx: { mt: '5px' },
                        // MenuListProps: { className: "mt-next-1" },
                      }}
                    >
                      {LANGUAGE.map((lang) => 
                        <MenuItem key={lang.value} value={lang.value}>
                          <img
                            height="22"
                            className="text-0 mr-2"
                            alt={lang.label}
                            src={`/image/flags/${lang.value === 'en' ? 'us' : lang.value}.svg`}
                          />
                          {lang.label}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                
                  {identity ?
                    <>
                      <Dropdown
                        labelAs={IconButton}
                        label={
                          identity.avatar ?
                            <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt={identity.name}
                              src={identity.avatar}
                            />
                            :
                            <div className="grid place-items-center rounded-full w-8 h-8 bg-w-blue-1 text-blue-700">
                              <WerkLogo width={20} height={20} />
                            </div>
                        }
                        buttonProps={{
                          className: "p-0",
                        }}
                        id="account-menu"
                        sx={{ mt: '5px' }}
                        MenuListProps={{
                          className: "min-w-[275px]",
                        }}
                      >
                        {(close: any) => [
                          <div key="1">
                            <MenuItem
                              disableRipple
                              disableTouchRipple
                              className="hover:bg-white cursor-auto select-auto"
                            >
                              {identity.avatar ?
                                <Avatar
                                  variant="rounded"
                                  sx={{ width: 48, height: 48 }}
                                  alt={identity.name}
                                  src={identity.avatar}
                                />
                                :
                                <div className="grid place-items-center rounded-md w-12 h-12 bg-w-blue-1 text-blue-700">
                                  <WerkLogo width={36} height={36} />
                                </div>
                              }
                              <div className="ml-3">
                                <b className="font-medium">{identity.name}</b>
                                <div className="text-xs">{identity.email}</div>
                              </div>
                            </MenuItem>
                            <hr className="my-3" />
                          </div>,
                          <MenuItem
                            key="2"
                            component={Link}
                            to={`/profile/${identity.accountName || identity.$id}`}
                            onClick={close}
                          >
                            <Typography textAlign="center">My Profile</Typography>
                          </MenuItem>,
                          <div key="3">
                            <MenuItem onClick={close}>
                              <Typography textAlign="center">Account Setting</Typography>
                            </MenuItem>
                            <hr className="my-3" />
                          </div>,
                          <MenuItem key="4" onClick={() => onLogout(close)}>
                            <Typography textAlign="center">Sign Out</Typography>
                          </MenuItem>
                        ]}
                      </Dropdown>
                    </>
                    :
                    <div className="flex flex-row items-center gap-3">
                      {/* <Button
                        component={Link}
                        to="/signup"
                        color="secondary"
                        className="mr-3"
                      >
                        Sign up
                      </Button> */}

                      <div>Continue with</div>
                      <Button
                        variant="outlined"
                        className="min-w-0 px-2"
                        onClick={() => signinWith("google")}
                      >
                        <img
                          width={18}
                          height={18}
                          alt="Google"
                          src="/image/brand/google.svg"
                        />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="min-w-0 px-2"
                        // onClick={() => signinWith("apple")}
                      >
                        <img
                          width={18}
                          height={18}
                          alt="Apple"
                          src="/image/brand/apple.svg"
                        />
                      </Button>
                    </div>
                  }
                </>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="flex flex-col min-h-calc-nav">
        {children}

        {footer && <FooterMain />}
      </div>

      {loadingSignin &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingSignin}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </>
  );
}
