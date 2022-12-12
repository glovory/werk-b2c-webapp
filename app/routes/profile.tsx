
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';

import LayoutLogged from '~/components/LayoutLogged';

const Profile: React.FC = () => {
  return (
    <LayoutLogged>
      <Container className="py-7 px-xs-0">
        <Grid justifyContent="center" container spacing={2}>
          <Grid item lg={8} xs={12}>
            <Card variant="outlined" className="rounded-xs-0">
              <CardMedia
                component="img"
                height="180"
                image="/image/bg/cover.jpg"
                alt="Cover"
              />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={9} xs={12}>
                    <h4>John Doe</h4>
                    <h6>Headline</h6>
                    <address>
                      Address
                    </address>
                  </Grid>

                  <Grid item lg={3} xs={12} className="text-right">
                    <Button>
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>

                <p>I'm a software engineer based in Barcelona with 10 years of experience in the software industry. My focus area for the past few years has been front-end development with React, but I'm also skilled in back-end development with Go. I am very quality-conscious because I spent my early career years in QA roles</p>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={4} xs={12}>
            <Card variant="outlined" className="rounded-xs-0">
              <CardHeader
                avatar={<WorkTwoToneIcon />}
                titleTypographyProps={{
                  variant: "body1",
                  className: "font-medium",
                }}
                title="Work Availability"
                action={
                  <Switch defaultChecked />
                }
              />
              <CardContent>
                Content
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LayoutLogged>
  );
}

export default Profile;
