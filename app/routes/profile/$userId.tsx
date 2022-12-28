import { useState } from 'react'; // , useEffect
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
import MenuItem from '@mui/material/MenuItem';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import OpenWithTwoToneIcon from '@mui/icons-material/OpenWithTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useGetIdentity } from "@pankod/refine-core";

// import { storage } from "~/utility"; // functions
import useGetFileView from '~/utils/hooks/useGetFileView';
import LayoutLogged from '~/components/LayoutLogged';
import FormProfile from '~/components/profile/FormProfile';
import Cover from '~/components/Cover';
import AvatarSetup from '~/components/AvatarSetup';
import Dropdown, { menuLeft } from '~/components/Dropdown';
import WerkLogo from '~/svg/Werk';
import CameraIcon from '~/svg/Camera';
import { enterToClick } from '~/utils/dom';
import { INITIAL_BG } from '~/config';

const Profile: React.FC = () => {
  const { data: userData, isLoading } = useGetIdentity<any>(); // , isSuccess
  const { $id: userId, name: fullName } = userData || {}; //email: userEmail 
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [cover, setCover] = useState<any>(INITIAL_BG);
  const [avatar, setAvatar] = useState<any>();
  const [loadingAvatar, setLoadingAvatar] = useState<any>(true);
  const [openModalView, setOpenModalView] = useState<boolean>(false);
  
  useGetFileView(
    userId ? userId + '_cropped' : null,
    (fileUrl: any) => {
      // console.log('useGetFileView fileUrl: ', fileUrl);
      fileUrl && setAvatar(fileUrl.href);
      setLoadingAvatar(false);
    }
  );

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
    console.log('Hit API to save background & backgroundCropped here');
    console.log('onSaveCover file: ', file);
    setCover(window.URL.createObjectURL(file)); // file
  }

  const onDeleteCover = (closeConfirm: any) => {
    setTimeout(() => {
      setCover(INITIAL_BG);
      closeConfirm();
    }, 1500);
  }

  const onSaveAvatar = (file: any) => {
    console.log('Hit API to save avatar & avatarCropped here');
    console.log('onSaveAvatar file: ', file);
    setAvatar(window.URL.createObjectURL(file)); // file
  }

  const viewPhotoAvatar = (close: any) => {
    close();
    setOpenModalView(true);
  }

  const onCloseModalView = () => {
    setOpenModalView(false);
  }

  const doDeleteAvatar = (close: any) => {
    close();
  }

  return (
    <LayoutLogged>
      <FormProfile
        open={modalEdit}
        onCloseModal={onCloseModal}
        onSubmit={onSaveProfile}
      />

      <Container className="pb-7 md:pt-7 max-md:px-0">
        <Grid justifyContent="center" container spacing={2}>
          <Grid item lg={8} xs={12}>
            <Card variant="outlined" className="max-md:rounded-none">
              <Cover
                disabled={isLoading}
                src={cover}
                onSave={onSaveCover}
                onDelete={onDeleteCover}
              />

              <CardContent className="max-md:text-center">
                <Grid container spacing={2}>
                  <Grid item lg={9} xs={12}>
                    <AvatarSetup
                      loading={isLoading || loadingAvatar} // !avatar
                      disabled={isLoading}
                      avatarProps={{
                        sx: { width: 120, height: 120 },
                      }}
                      iconProps={{
                        width: 60,
                        height: 60
                      }}
                      src={avatar}
                      alt={fullName}
                      className="border-solid border-white max-md:mx-auto w-140 h-140"
                      style={{
                        marginTop: -80,
                        borderWidth: 10,
                      }}
                      openModalView={openModalView}
                      onCloseModalView={onCloseModalView}
                      onSave={onSaveAvatar}
                    >
                      {(onChangeFile: any, disabled: any) => (
                        avatar ?
                          <Dropdown
                            keepMounted
                            {...menuLeft}
                            disableAutoFocusItem
                            label={<CameraIcon />}
                            buttonProps={{
                              disabled,
                              className: "min-w-0 p-1 rounded-full hover:bg-white absolute bottom-0"
                            }}
                          >
                            {(close: any) => [
                              <MenuItem key="v" onClick={() => viewPhotoAvatar(close)}>
                                <VisibilityTwoToneIcon className="mr-2" />View Photo
                              </MenuItem>,
                              <MenuItem key="1" component="label" onClick={close} onKeyDown={enterToClick}>
                                <ImageTwoToneIcon className="mr-2" />Choose From Gallery
                                <input onChange={onChangeFile} type="file" accept=".jpg,.jpeg,.png" hidden />
                              </MenuItem>,
                              <MenuItem key="c" onClick={close}>
                                <OpenWithTwoToneIcon className="mr-2" />Change Position
                              </MenuItem>,
                              <hr key="h" className="my-2" />,
                              <MenuItem key="d" onClick={() => doDeleteAvatar(close)}>
                                <DeleteTwoToneIcon className="mr-2" />Delete Photo
                              </MenuItem>,
                            ]}
                          </Dropdown>
                          :
                          <Button
                            disabled={disabled}
                            component="label"
                            className="min-w-0 p-1 rounded-full hover:bg-white absolute bottom-0"
                            onKeyDown={enterToClick}
                          >
                            <CameraIcon />
                            <input onChange={onChangeFile} disabled={disabled} type="file" accept=".jpg,.jpeg,.png" hidden />
                          </Button>
                      )}
                    </AvatarSetup>

                    <h4 className="mb-0 mt-3 font-semibold text-gray-800">{fullName}</h4>
                    <h6 className="mb-1 text-orange-400">Headline</h6>
                    <address className="not-italic text-sm text-gray-500">
                      <RoomTwoToneIcon sx={{ fontSize: 16 }} className="align-middle" /> Address
                    </address>
                  </Grid>

                  <Grid item lg={3} xs={12} className="lg:text-right max-md:flex max-md:flex-col items-center">
                    <Button
                      color="secondary"
                      className="mb-4 bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white"
                    >
                      <WerkLogo className="mr-1" />
                      werk.id/@john_doe
                    </Button>
                    <Button
                      className="text-blue-600 min-w-0"
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
                  <HelpTwoToneIcon sx={{ fontSize: 15 }} className="mr-1" />
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
