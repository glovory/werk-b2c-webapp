import Grid from '@mui/material/Grid';
import WelcomeLayout from "~/components/WelcomeLayout";

const Failure: React.FC = () => {
  return (
    <WelcomeLayout>
      <Grid container className="justify-center grow py-8 px-4">
        <Grid item md={4} sm={6}>
          <div className="mb-12 pb-5 text-center">
            <h1 className="h4">Failure login</h1>
            <p>
              Please try again.
            </p>
          </div>
        </Grid>
      </Grid>
    </WelcomeLayout>
  );
}

export default Failure;
