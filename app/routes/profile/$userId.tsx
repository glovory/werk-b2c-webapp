import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useGetIdentity } from "@pankod/refine-core";

import LayoutLogged from '~/components/LayoutLogged';
import FormProfile from '~/components/profile/FormProfile';
import Cover from '~/components/Cover';
import AvatarSetup from '~/components/AvatarSetup';
import WerkLogo from '~/svg/werk';

const Profile: React.FC = () => {
  const { data: identity } = useGetIdentity<any>();
  const { name: fullName } = identity || {}; // $id: userId, email: userEmail 
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [cover, setCover] = useState<any>("/image/bg/cover.svg"); // cover.jpg
  const [avatar, setAvatar] = useState<any>();

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

  const onSaveCover = (file: any) => {
    setCover(file);
  }

  const onSaveAvatar = (file: any) => {
    setAvatar(file);
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
            <Card variant="outlined" className="rounded-xs-0">
              <Cover
                src={cover}
                onSave={onSaveCover}
              />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={9} xs={12}>
                    <AvatarSetup
                      src={avatar}
                      alt={fullName}
                      className="border-solid border-white"
                      style={{
                        marginTop: -80,
                        borderWidth: 10,
                      }}
                      onSave={onSaveAvatar}
                    />

                    <h4 className="mb-0 mt-3 font-semibold text-gray-800">{fullName}</h4>
                    <h6 className="mb-1 text-orange-400">Headline</h6>
                    <address className="not-italic text-sm text-gray-500">
                      <RoomTwoToneIcon sx={{ fontSize: 16 }} className="align-middle" /> Address
                    </address>
                  </Grid>

                  <Grid item lg={3} xs={12} className="text-right">
                    <Button
                      color="secondary"
                      className="mb-4 bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white"
                    >
                      <WerkLogo className="mr-1" />
                      werk.id/@john_doe
                    </Button>
                    <Button
                      className="text-blue-600"
                      onClick={onOpenModal}
                    >
                      <EditTwoToneIcon fontSize="small" className="mr-2" />
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
                className="py-2 border-bottom"
              />
              <List component="div" dense>
                <ListItem
                  // key={value}
                  component="label"
                  secondaryAction={
                    <Checkbox
                      size="small"
                      edge="end"
                      // onChange={handleToggle(value)}
                      // checked={checked.indexOf(value) !== -1}
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton className="px-5">
                    <ListItemText primary="Internship" />
                  </ListItemButton>
                </ListItem>
              </List>
              <CardActions className="justify-end border-top">
                <Button size="small" color="inherit">
                  Learn more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LayoutLogged>
  );
}

export default Profile;
