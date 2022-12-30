import { useState, useRef, useEffect } from 'react'; // 
import { type MetaFunction } from "@remix-run/node";
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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useGetIdentity, useList } from "@pankod/refine-core";
//
import { storage } from "~/utility";
import LayoutLogged from '~/components/LayoutLogged';
import FormProfile from '~/components/profile/FormProfile';
import Cover from '~/components/Cover';
import AvatarSetup from '~/components/AvatarSetup';
import Dropdown, { menuLeft, menuCenter } from '~/components/Dropdown';
import WerkLogo from '~/svg/werk';
import CameraIcon from '~/svg/Camera';
import MoveIcon from '~/svg/Move';
import WorkExperience from '~/components/profile/sections/WorkExperience';
import Education from '~/components/profile/sections/Education';
import HardSkill from '~/components/profile/sections/HardSkill';
import SoftSkill from '~/components/profile/sections/SoftSkill';
import { enterToClick } from '~/utils/dom';
import { INITIAL_BG, BUCKET_ID, CANDIDATE_PROFILES } from '~/config';

export const meta: MetaFunction = () => ({
  title: "Profile | Werk",
});

const Profile: React.FC = () => {
  const { data: userData, isLoading } = useGetIdentity<any>(); // , isSuccess
  const { $id: userId, $createdAt: createdAt, name: fullName } = userData || {}; // email: userEmail
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useList({
    liveMode: "off",
    resource: CANDIDATE_PROFILES,
    config: {
      hasPagination: false,
      filters: [
        {
          field: "candidateId",
          operator: "eq",
          value: userId,
        },
      ],
    },
  });
  const { accountName, headLine, city, province, country, bio } = currentUser?.data?.[0] || {};
  const theme = useTheme();
  const isDeviceMd = useMediaQuery(theme.breakpoints.down('md'));
  const refFile = useRef();
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [cover, setCover] = useState<any>(INITIAL_BG);
  const [avatar, setAvatar] = useState<any>();
  const [avatarDefault, setAvatarDefault] = useState<any>();
  const [loadingAvatar, setLoadingAvatar] = useState<any>(true);
  const [openModalView, setOpenModalView] = useState<boolean>(false);

  useEffect(() => {
    if(userId){
      const avatarSrc = storage.getFileView(BUCKET_ID, userId + '_cropped');
      if(avatarSrc?.href){
        setAvatar(avatarSrc.href);
        setLoadingAvatar(false);
      }
    }
  }, [userId]);

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
    close(); // Close menu
    setOpenModalView(true);
  }

  const onCloseModalView = () => {
    setOpenModalView(false);
  }

  const doDeleteAvatar = (close: any) => {
    close(); // Close menu
  }

  const doChangePositionAvatar = (close: any, openModalCrop: any) => {
    close(); // Close menu
    const avatarOriSrc = storage.getFileView(BUCKET_ID, userId);
    if(avatarOriSrc?.href){
      setAvatarDefault(avatarOriSrc.href);
    }
    openModalCrop(); // Open dialog
  }

  return (
    <LayoutLogged>
      <FormProfile
        open={modalEdit}
        onCloseModal={onCloseModal}
        onSubmit={onSaveProfile}
      />

      <Container className="pb-7 md:pt-7 max-md:px-0">
        <Grid container spacing={3} justifyContent="center">
          <Grid item lg={9} xs={12} className="flex flex-col gap-6">
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
                      loading={isLoading || loadingAvatar}
                      disabled={isLoading || loadingAvatar}
                      avatarProps={{
                        sx: { width: 120, height: 120 },
                      }}
                      iconProps={{
                        width: 60,
                        height: 60
                      }}
                      src={avatar}
                      cropSrc={avatarDefault}
                      alt={fullName}
                      className="border-solid border-white max-md:mx-auto w-140 h-140"
                      style={{
                        marginTop: -80,
                        borderWidth: 10,
                      }}
                      inputRef={refFile}
                      openModalView={openModalView}
                      onCloseModalView={onCloseModalView}
                      onSave={onSaveAvatar}
                    >
                      {(onChangeFile: any, openModalCrop: any, disabled: any) => (
                        avatar ?
                          <Dropdown
                            mountOnOpen // keepMounted
                            {...(isDeviceMd ? menuCenter : menuLeft)}
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
                                <input ref={refFile as any} onChange={onChangeFile} disabled={disabled} type="file" accept=".jpg,.jpeg,.png" hidden />
                              </MenuItem>,
                              <MenuItem key="c" onClick={() => doChangePositionAvatar(close, openModalCrop)}>
                                <MoveIcon width={18} height={18} className="ml-1 mr-3" />Change Position
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
                            <input ref={refFile as any} onChange={onChangeFile} disabled={disabled} type="file" accept=".jpg,.jpeg,.png" hidden />
                          </Button>
                      )}
                    </AvatarSetup>
                    
                    <h4 className="mb-0 mt-3 font-semibold text-gray-800">{fullName}</h4>

                    {headLine && <h6 className="mb-1 text-orange-400">{headLine}</h6>}
                    
                    {(city || province || country) &&
                      <address className="not-italic text-sm text-gray-500">
                        <RoomTwoToneIcon sx={{ fontSize: 16 }} className="align-middle" /> {[city, province, country].filter((f: any) => f).join(', ')}
                      </address>
                    }
                  </Grid>
                  
                  <Grid item lg={3} xs={12} className="lg:text-right max-md:flex max-md:flex-col items-center">
                    {accountName &&
                      <Button
                        color="secondary"
                        className="mb-4 bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white"
                      >
                        <WerkLogo className="mr-1" />
                        werk.id/@{accountName}
                      </Button>
                    }
                    <Button
                      className="text-blue-600 min-w-0"
                      onClick={onOpenModal}
                    >
                      <EditTwoToneIcon fontSize="small" className="mr-2" />
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>

                {bio &&
                  <p className="my-5 text-sm text-gray-500">
                    {bio}
                  </p>
                }
                <div className="text-xs text-gray-400">
                  Joined Werk: <time dateTime={createdAt} className="font-medium">23 November 2022</time>
                </div>
              </CardContent>
            </Card>

            <WorkExperience />

            <Education />

            <HardSkill />

            <SoftSkill />
          </Grid>
          
          <Grid item lg={3} xs={12} className="flex flex-col gap-6">
            <Card variant="outlined" className="max-md:rounded-none w-card">
              <CardHeader
                avatar={<WorkTwoToneIcon />}
                titleTypographyProps={{
                  className: "font-medium",
                }}
                title="Work Availability"
                action={
                  <Switch defaultChecked />
                }
                className="py-2 border-bottom"
              />
              <List component="div" dense>
                {['Internship', 'Freelance Hourly Based'].map((item: any) =>
                  <ListItem
                    key={item}
                    disablePadding
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
                  >
                    <ListItemButton className="px-5">
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <CardActions className="justify-end border-top py-1">
                <Button size="small" color="inherit">
                  <HelpTwoToneIcon sx={{ fontSize: 15 }} className="mr-1" />
                  Learn more
                </Button>
              </CardActions>
            </Card>

            <Card variant="outlined" className="max-md:rounded-none w-card">
              <CardHeader
                avatar={<ExploreTwoToneIcon />}
                titleTypographyProps={{
                  className: "font-medium",
                }}
                title="Preferred Work Type"
                className="py-2 border-bottom"
              />
              <List component="div" dense>
                {['Onsite Work', 'Remote Work', 'Hybrid'].map((item: any) =>
                  <ListItem
                    key={item}
                    disablePadding
                    component="label"
                    secondaryAction={
                      <Checkbox
                        size="small"
                        edge="end"
                      />
                    }
                  >
                    <ListItemButton className="px-5">
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <CardActions className="justify-end border-top py-1">
                <Button size="small" color="inherit">
                  <HelpTwoToneIcon sx={{ fontSize: 15 }} className="mr-1" />
                  Learn more
                </Button>
              </CardActions>
            </Card>

            <Card variant="outlined" className="max-md:rounded-none w-card">
              <CardHeader
                avatar={<BadgeTwoToneIcon />}
                titleTypographyProps={{
                  className: "font-medium",
                }}
                title="Other Information"
                className="py-2 border-bottom"
              />
              <List component="div" dense>
                {['Phone Number', 'Website', 'Social Media'].map((item: any) =>
                  <ListItem
                    key={item}
                    component="label"
                    disablePadding
                  >
                    <ListItemButton className="px-4 text-blue-700">
                      <AddTwoToneIcon fontSize="small" className="mr-1" />
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LayoutLogged>
  );
}

export default Profile;
