import CircularProgress from '@mui/material/CircularProgress';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
//
import { isSSR } from "~/utils/typeChecking";

const ssr = isSSR();

export default function LoadingPage(){
  return (
    <div
      data-nosnippet="true"
      aria-hidden="true"
      tabIndex={-1}
      className="grid place-items-center min-h-screen"
    >
      <div className="hideSSR relative">
        <img src="/image/logo/werk-logo-symbol.svg" alt="Werk" className="absolute inset-0 m-auto" />
        <CircularProgress size={60} />
      </div>

      <noscript>
        {/** @NOTE : Only SSR, for disable JavaScript by user browser */}
        {ssr && (
          <>
            <CodeTwoToneIcon className="block mx-auto" />
            Please enable JavaScript
          </>
        )}
      </noscript>
    </div>
  );
}
