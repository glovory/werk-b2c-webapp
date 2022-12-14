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
import { useGetIdentity, useList, useNavigation } from "@pankod/refine-core"; // useLogout
//
import { account, storage, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";
import { authProvider } from '~/authProvider';
import { BUCKET_ID, CandidateProfiles } from '~/config';
import { imgLoader } from '~/utils/dom';
import FooterMain from './FooterMain';
import Dropdown, { menuRight } from "./Dropdown";
import WerkLogo from '~/svg/werk';

interface LayoutLoggedProps {
  footer?: boolean | any
  children?: ReactNode | any
}

const LANGUAGE = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
];

export default function LayoutLogged({
  footer = true,
  children,
}: LayoutLoggedProps){
  const { data: userData, isLoading, isSuccess } = useGetIdentity<any>();
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useList({
    errorNotification: false,
    liveMode: "off",
    resource: CandidateProfiles,
    config: {
      hasPagination: false,
      filters: [
        {
          field: "candidateId",
          operator: "eq",
          value: userData?.$id,
        },
      ],
    },
  });
  // const { mutate: logout } = useLogout<string>();
  const { replace } = useNavigation();
  const [identity, setIdentity] = useState<any>();
  const [loadingIdentity, setLoadingIdentity] = useState<boolean>(true);
  const [loadingSignin, setLoadingSignin] = useState<boolean>(false);
  const [loadingAvatar, setLoadingAvatar] = useState<any>(true);
  const [firstRenderMenuLang, setFirstRenderMenuLang] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>();
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const loadingDone = !isLoading && !isLoadingCurrentUser;
    if(loadingDone){
      setLoadingIdentity(false);
    }
    
    if(loadingDone && currentUser && userData && isSuccess){
      const userCurrent = currentUser?.data?.[0] || {};
      setIdentity({ ...userData, ...userCurrent });

      if(userCurrent.avatarCropped){
        const ava = storage.getFileView(BUCKET_ID, userCurrent.avatarCropped);
        if(ava?.href){
          setAvatar(ava.href);
          setLoadingAvatar(false);
        }
      }else{
        setAvatar(null);
        setLoadingAvatar(false);
      }
    }
  }, [userData, isSuccess, isLoading, isLoadingCurrentUser, currentUser]);

  const languageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  }

  const signinWith = (provider: string) => {
    setLoadingSignin(true);
    const baseUrl = window.location.origin;
    account.createOAuth2Session(provider, baseUrl + REDIRECT_SUCCESS, baseUrl + REDIRECT_FAILURE);
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
        replace(req);
      }
    }
  }

  const openMenuLang = () => {
    !firstRenderMenuLang && setFirstRenderMenuLang(true);
  }

  return (
    <>
      <AppBar
        enableColorOnDark
        id="navMain"
        elevation={0}
        color="default"
        variant="outlined"
        position="sticky"
        sx={{ borderBottom: '1px solid #dedede' }}
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
              {isLoading || isLoadingCurrentUser ?
                <Typography component="div" variant="h4" className="hideSSR" width={240}>
                  <Skeleton />
                </Typography>
                :
                <>
                  <FormControl
                    variant="standard"
                    size="small"
                    className="mr-5"
                    sx={{ width: 72.5 }}
                  >
                    <Select
                      value={language}
                      onChange={languageChange}
                      onOpen={openMenuLang}
                      displayEmpty
                      IconComponent={ExpandMoreTwoToneIcon}
                      // @ts-ignore:next-line
                      MenuProps={{
                        ...menuRight,
                        sx: { mt: '5px' },
                        id: "menuAppLang",
                        keepMounted: firstRenderMenuLang,
                      }}
                      className="w-select-sm"
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
                
                  {isSuccess && identity ?
                    <Dropdown
                      buttonProps={{ className: "p-0" }}
                      id="accountMenu"
                      sx={{ mt: '5px' }}
                      MenuListProps={{ className: "min-w-[275px]" }}
                      labelAs={IconButton}
                      label={
                        loadingAvatar ?
                          <Skeleton animation="wave" variant="circular" width={32} height={32} />
                          :
                          avatar ?
                            <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt={identity.name}
                              src={avatar}
                              imgProps={imgLoader()}
                            />
                            :
                            <div className="grid place-items-center rounded-full w-8 h-8 bg-w-blue-1 text-blue-700">
                              <WerkLogo width={20} height={20} />
                            </div>
                      }
                    >
                      {(close: any) => [
                        <MenuItem
                          key="1"
                          disableRipple
                          disableTouchRipple
                          className="hover:bg-white cursor-auto select-auto"
                        >
                          {avatar ?
                            <Avatar
                              variant="rounded"
                              sx={{ width: 48, height: 48 }}
                              alt={identity.name}
                              src={avatar}
                              imgProps={imgLoader()}
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
                        </MenuItem>,
                        <hr key="2" className="my-3" />,
                        <MenuItem
                          key="3"
                          component={Link}
                          to={`/profile/${identity.accountName}`}
                          onClick={close}
                        >
                          My Profile
                        </MenuItem>,
                        <MenuItem
                          key="4"
                          component={Link}
                          to="/account-setting"
                          onClick={close}
                        >
                          Account Setting
                        </MenuItem>,
                        <hr key="5" className="my-3" />,
                        <MenuItem key="6" onClick={() => onLogout(close)}>
                          Sign Out
                        </MenuItem>
                      ]}
                    </Dropdown>
                    :
                    <div className="flex flex-row items-center gap-3">
                      <div className="text-sm">Continue with</div>
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
        {/* {children} */}
        {typeof children === 'function' ? children({ identity, isSuccess, loadingIdentity }) : children}

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
