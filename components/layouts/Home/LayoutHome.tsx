import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

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
