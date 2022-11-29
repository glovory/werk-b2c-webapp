import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

// , ...props
const Layout = ({ children }: Props) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      {children}
      
      <Footer />
    </div>
  );
};
  
export default Layout;
