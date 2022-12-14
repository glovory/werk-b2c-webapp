import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Link } from "@remix-run/react";
import { useGetIdentity } from "@pankod/refine-core";

import { account, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";
interface Props {
  children?: ReactNode,
}

const MENUS = Array.from({ length: 5 });

export default function StartLayout({
  children,
}: Props){
  const { data: identity } = useGetIdentity<any>();
  const [isLogged, setIsLogged] = useState(true);
  const [loadingLoginWith, setLoadingLoginWith] = useState(false);

  useEffect(() => {
    if(identity){
      setIsLogged(false);
    }
  }, [identity]);

  const signinWith = (provider: string) => {
    setLoadingLoginWith(true);

    // window.open('', 'Sign in - Google Account', `left=${(screen.width - 496) / 2},top=${(screen.height - 574) / 4},width=496,height=574`);
    // "https://staging.business.werk.id/v1/auth/oauth2/success", "https://staging.business.werk.id/v1/auth/oauth2/failure"
    const baseUrl = window.location.origin;
    account.createOAuth2Session(provider, baseUrl + REDIRECT_SUCCESS, baseUrl + REDIRECT_FAILURE);
  }

  return (
    <>
      <AppBar
        enableColorOnDark
        component="nav"
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
            variant="dense" // dense | regular
            className="px-0"
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img
                // width="32"
                // height="32"
                src="/image/logo/werk-logo-symbol.svg" // /image/werk-logo-symbol-space.svg
                alt="Werk"
              />
            </Typography>
            
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {MENUS.map((item, idx) => (
                <Button key={idx} color="secondary">
                  Menu {idx + 1}
                </Button>
              ))}

              <Button component={Link} to="/signup" color="secondary">
                Sign up
              </Button>
            </Box>

            {isLogged &&
              <div className="ml-6 flex flex-row items-center gap-3">
                Continue with
                <LoadingButton
                  variant="outlined"
                  className="min-w-0"
                  loading={loadingLoginWith}
                  onClick={() => signinWith("google")}
                >
                  <img
                    width={18}
                    height={18}
                    alt="Google Logo"
                    src="/image/brand/google.svg"
                  />
                </LoadingButton>
                <Button
                  variant="contained"
                  color="secondary"
                  className="min-w-0"
                  // onClick={() => signinWith("apple")}
                >
                  <img
                    width={18}
                    height={18}
                    alt="Apple Logo"
                    src="/image/brand/apple.svg"
                  />
                </Button>
              </div>
            }
          </Toolbar>
        </Container>
      </AppBar>

      <div className="min-h-calc-nav">
        {children}
      </div>
    </>
  );
}
