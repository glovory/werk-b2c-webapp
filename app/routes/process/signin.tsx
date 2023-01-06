import { useNavigate } from "@remix-run/react";
//
import useCheckUserExist from '~/utils/hooks/useCheckUserExist';
import LoadingPage from '~/components/LoadingPage';

const ProcessSignIn: React.FC = () => {
  const navigate = useNavigate();

  useCheckUserExist((res: any) => {
    navigate(res?.isExist ? '/' : '/build-profile', { replace: true });
  });

  return <LoadingPage />;
}

export default ProcessSignIn;
