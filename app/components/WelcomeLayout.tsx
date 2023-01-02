import type { ReactNode } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "@remix-run/react";

import FooterMain from './FooterMain';

interface WelcomeLayoutProps {
  children?: ReactNode,
}

export default function WelcomeLayout({
  children,
}: WelcomeLayoutProps){
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
        <Toolbar
          variant="dense" // dense | regular
          className="justify-center"
        >
          <Link to="/">
            <img
              // width="32"
              // height="32"
              src="/image/logo/werk-logo-symbol.svg" // /image/werk-logo-symbol-space.svg
              alt="Werk"
            />
          </Link>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col items-center justify-center bg-white min-h-calc-nav">
        {children}

        <FooterMain className="bg-white" />
      </div>
    </>
  );
}
