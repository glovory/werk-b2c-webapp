import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children?: ReactNode,
  title?: string,
}

const LayoutHome = ({ children, title }: Props) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header title={title} />

      {children}
      
      <Footer className="bg-white" />
    </div>
  );
};
  
export default LayoutHome;
