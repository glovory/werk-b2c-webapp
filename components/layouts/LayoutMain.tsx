import { ReactNode } from "react";
import Head from 'next/head';
import NavMain from "./NavMain";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Werk</title>
      </Head>

      <NavMain />

      {children}
    </>
  );
};
  
export default LayoutMain;
