import { useNavigation } from "@pankod/refine-core";
//
import useCheckUserExist from '~/utils/hooks/useCheckUserExist';
import LoadingPage from '~/components/LoadingPage';

const ProcessSignIn: React.FC = () => {
  const { replace } = useNavigation();

  useCheckUserExist((res: any) => {
    replace(res?.isExist ? '/' : '/build-profile');
  });

  return <LoadingPage />;
}

export default ProcessSignIn;
