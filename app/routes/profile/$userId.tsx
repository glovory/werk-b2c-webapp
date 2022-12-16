import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';

import LayoutLogged from '~/components/LayoutLogged';
import FormProfile from '~/components/profile/FormProfile';
import Dropdown from '~/components/Dropdown';

const Profile: React.FC = () => {
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  // const [photo, setPhoto] = useState<any>();

  const onSaveProfile = (data: any) => {
    console.log('onSaveProfile data: ', data);
    if(data){
      setModalEdit(false);
    }
  }

  const onOpenModal = () => {
    setModalEdit(true);
  }

  const onCloseModal = () => {
    setModalEdit(false);
  }

  const testEnv = () => {
    // console.log(process.env.APPWRITE_URL);
  }

  return (
    <LayoutLogged>
      <FormProfile
        open={modalEdit}
        onCloseModal={onCloseModal}
        onSubmit={onSaveProfile}
      />

      <Container className="py-7 px-xs-0">
        <Grid justifyContent="center" container spacing={2}>
          <Grid item lg={8} xs={12}>
            <Card variant="outlined" className="rounded-xs-0 relative">
              {/* Cover */}
              <Dropdown
                label={<CameraAltTwoToneIcon />}
                buttonProps={{
                  className: "min-w-0 p-1 absolute top-4 right-4 z-1 hover:bg-white"
                }}
                // elevation={0}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {(close: any) => [
                  <MenuItem key="1" component="label" onClick={close}>
                    <ImageTwoToneIcon className="mr-2" />Choose From Gallery
                    <input type="file" accept=".jpg,.jpeg,.png" hidden />
                  </MenuItem>,
                  <MenuItem key="2" onClick={close}>
                    <img src="/image/brand/unsplash.svg" alt="Unsplash" width="15.5" className="ml-1 mr-2" /> Choose From Unsplash
                  </MenuItem>
                ]}
              </Dropdown>

              <CardMedia
                component="img"
                height="180"
                alt="Cover"
                image="/image/bg/cover.jpg"
              />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={9} xs={12}>
                    {/* Avatar */}
                    <h4 className="mb-0 font-semibold text-gray-800">John Doe</h4>
                    <h6 className="mb-0 text-orange-400">Headline</h6>
                    <address className="not-italic text-sm text-gray-500">
                      Address
                    </address>
                  </Grid>

                  <Grid item lg={3} xs={12} className="text-right">
                    <Button
                      onClick={testEnv}
                      color="secondary"
                      className="mb-4 bg-gray-100 text-gray-500 hover:bg-blue-900 hover:text-white"
                    >
                      werk.id/@john_doe
                    </Button>
                    <Button
                      className="text-blue-700"
                      onClick={onOpenModal}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>

                <p className="my-5 text-sm text-gray-500">
                  I'm a software engineer based in Barcelona with 10 years of experience in the software industry. 
                  My focus area for the past few years has been front-end development with React, but I'm also skilled in back-end development with Go. 
                  I am very quality-conscious because I spent my early career years in QA roles
                </p>
                <div className="text-xs text-gray-400">
                  Joined Werk: <time className="font-medium">23 November 2022</time>
                </div>
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
