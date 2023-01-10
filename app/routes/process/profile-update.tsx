import { useEffect } from "react";
import { useNavigation } from "@pankod/refine-core";
//
import LoadingPage from '~/components/LoadingPage';

const ProcessProfileUpdate: React.FC = () => {
  const { replace, goBack } = useNavigation();

  useEffect(() => {
    const user = new URLSearchParams(window.location.search).get('u');;
    user ? replace(`/profile/${user}`) : goBack();
  }, []);

  return <LoadingPage />;
}

export default ProcessProfileUpdate;
