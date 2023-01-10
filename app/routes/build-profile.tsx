import { useNavigation } from "@pankod/refine-core"; // LayoutWrapper
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
//
import AuthSensor from '~/components/AuthSensor';
import WelcomeLayout from "~/components/WelcomeLayout";

const BuildProfile: React.FC = () => {
  const { push } = useNavigation();

  return (
    <AuthSensor>
      <WelcomeLayout>
        <div className="container mx-auto pt-8 px-4 text-center max-w-md">
          <h1 className="h4 mb-3 font-bold">Let's Build Your Profile!</h1>
          <p className="mb-4">
            Connect with LinkedIn to auto complete build your profile.<br />
            You can change it anytime in your profile.
          </p>

          <img
            className="block w-64 h-auto my-7 mx-auto"
            alt="User"
            src="/image/misc/animation_1.png"
          />

          <div className="grid gap-4 w-full">
            <Button
              size="large"
              variant="contained"
              // onClick={() => push("/linkedin-connect")}
            >
              <LinkedInIcon className="mr-2" />Import LinkedIn Profile
            </Button>
            <Button
              size="large"
              variant="text"
              onClick={() => push("/setup-profile")}
            >
              <b>Skip This Step</b>
            </Button>
          </div>
        </div>
      </WelcomeLayout>
    </AuthSensor>
  );
}

export default BuildProfile;
