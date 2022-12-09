import type { ReactNode } from "react";
import Head from 'next/head';
import NavLogged from "./NavLogged";
import Footer from "../layouts/Home/Footer";

interface Props {
  children?: ReactNode,
  title?: string,
}

export default function LayoutLogged({ children, title }: Props){
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NavLogged />

      {children}

      <Footer />
    </>
  );
}
