import React, { ReactNode } from "react";
import Head from 'next/head';
import NavMain from "./NavMain";
// import Footer from "./footer";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

// , ...props
// div className="min-vh-100 d-flex flex-column"
const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Head title</title>
      </Head>

      <NavMain />

      {children}
      
      {/* <Footer /> */}
    </>
  );
};
  
export default LayoutMain;
