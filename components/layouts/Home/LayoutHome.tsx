import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface Props {
  children?: ReactNode
  // any props that come into the component
}
  
const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
};
  
export default Layout;