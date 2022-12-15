import { useEffect } from "react";
import { useParams } from "@remix-run/react";
import CircularProgress from '@mui/material/CircularProgress';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';

import { account, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";

const LoginWith: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    // const provider = new URLSearchParams(window.location.search).get('provider');
    const provider = params.providerId;
    if(provider && ['google'].includes(provider)){
      account.createOAuth2Session(provider, REDIRECT_SUCCESS, REDIRECT_FAILURE);
    }
  }, []);

  return (
    <div className="grid place-items-center min-h-screen">
      <div data-nosnippet="true" id="loader" className="relative">
        <img src="/image/logo/werk-logo-symbol.svg" alt="Werk" className="absolute inset-0 m-auto" />
        <CircularProgress size={60} />
      </div>

      <noscript data-nosnippet="true" className="text-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `#loader{display:none}`
          }}
        />
        <CodeTwoToneIcon className="block mx-auto" />
        Please enable JavaScript
      </noscript>
    </div>
  );
}

export default LoginWith;
