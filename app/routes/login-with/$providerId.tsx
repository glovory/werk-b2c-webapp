import { useEffect } from "react";
import { useParams } from "@remix-run/react";
//
import LoadingPage from '~/components/LoadingPage';
import { account, REDIRECT_SUCCESS, REDIRECT_FAILURE } from "~/utility";

const LoginWith: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    // const provider = new URLSearchParams(window.location.search).get('provider');
    const provider = params.providerId;
    if(provider && ['google'].includes(provider)){
      // window.open('', 'Sign in - Google Account', `left=${(screen.width - 496) / 2},top=${(screen.height - 574) / 4},width=496,height=574`);
      // "https://staging.business.werk.id/v1/auth/oauth2/success", "https://staging.business.werk.id/v1/auth/oauth2/failure"
      const baseUrl = window.location.origin;
      account.createOAuth2Session(provider, baseUrl + REDIRECT_SUCCESS, baseUrl + REDIRECT_FAILURE);
    }
  }, []);

  return <LoadingPage />;
}

export default LoginWith;
