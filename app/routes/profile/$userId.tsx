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
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useParams } from "@remix-run/react";
import { useGetIdentity, useList, useUpdate, useNotification } from "@pankod/refine-core"; // useIsExistAuthentication
//
import { storage, functions } from "~/utility";
import { INITIAL_BG, ACCEPT_IMG, BUCKET_ID, CandidateProfiles, DeleteAvatarBackground } from '~/config';
import LayoutLogged from '~/components/LayoutLogged';
import { CardUser, CardSection } from '~/components/profile/Loader';
import Time from '~/components/Time';
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

export const meta: MetaFunction = () => ({
  title: "Profile | Werk",
});

const Profile: React.FC = () => {
  const params = useParams();
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open: openNotif } = useNotification(); // , close: closeNotif
  const { mutate } = useUpdate();
  const refFile: any = useRef();
  const { data: loggedInUser, isLoading } = useGetIdentity<any>(); // isSuccess
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useList({
    errorNotification: false,
    liveMode: "off",
    resource: CandidateProfiles,
    config: {
      hasPagination: false,
      filters: [
        {
          field: "accountName",
          operator: "eq",
          value: params?.userId,
        },
      ],
    },
  });
  const { $id: logId } = loggedInUser || {};
  const { id: documentId, candidateId, fullName, accountName, headLine, bio, country, province, city, avatar: avatarVal, avatarCropped, backgroundPhoto, backgroundPhotoCropped, $createdAt } = currentUser?.data?.[0] || {};
  const isLoggedInUser = candidateId === logId;
  
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [cover, setCover] = useState<any>(INITIAL_BG);
  const [coverDefault, setCoverDefault] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [avatarDefault, setAvatarDefault] = useState<any>();
  const [loadingAvatar, setLoadingAvatar] = useState<any>(true);
  const [loadingSaveBgCover, setLoadingSaveBgCover] = useState<any>(false);
  const [provinceValue, setProvinceValue] = useState<any>(null);
  const [cityValue, setCityValue] = useState<any>(null);
  const [openModalView, setOpenModalView] = useState<boolean>(false);
  const [listWorkExperience, setListWorkExperience] = useState<any>([]);
  const [listEducation, setListEducation] = useState<any>([]);

  useEffect(() => {
    if(!isLoadingCurrentUser){
      if(province && city){
        setProvinceValue(province);
        setCityValue(city);
      }
      // Avatar
      if(avatarCropped){
        // const avatarSrc = storage.getFileView(BUCKET_ID, avatarCropped);
        // if(avatarSrc?.href) setAvatar(avatarSrc.href);
        setAvatar(storage.getFileView(BUCKET_ID, avatarCropped)?.href);
      }
      if(avatarVal){
        setAvatarDefault(storage.getFileView(BUCKET_ID, avatarVal)?.href);
      }
      // Background
      if(backgroundPhotoCropped){
        const bgCrop = storage.getFileView(BUCKET_ID, backgroundPhotoCropped);
        // console.log('backgroundPhotoCropped: ', backgroundPhotoCropped);
        // console.log('bgCrop: ', bgCrop);
        setCover(bgCrop?.href);
      }
      if(backgroundPhoto){
        const bgOri = storage.getFileView(BUCKET_ID, backgroundPhoto);
        // console.log('backgroundPhoto: ', backgroundPhoto);
        // console.log('bgOri: ', bgOri);
        setCoverDefault(bgOri?.href);
      }
  
      setLoadingAvatar(false);
    }
  }, [isLoadingCurrentUser, province, city, avatarVal, avatarCropped, backgroundPhoto, backgroundPhotoCropped]);

  const notifFailedSaveBg = () => {
    // @ts-ignore
    openNotif({ type: "error", message: "Failed to save Background", key: "notifEditBg" });
  }

  const onSaveCover = async (crop: any, original: any) => {
    if(candidateId && documentId){
      const filename = 'bg_' + candidateId;
      const cropName = filename + '_cropped';
      setLoadingSaveBgCover(true);
      try {
        const ext = { type: "image/jpeg" };
        const originalFile = new File([original], filename + '.jpg', ext);
        await storage.createFile(BUCKET_ID, filename, originalFile);
  
        const cropFile = new File([crop], cropName + '.jpg', ext);
        await storage.createFile(BUCKET_ID, cropName, cropFile);
        // https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/
        mutate({
          resource: CandidateProfiles,
          id: documentId,
          values: { backgroundPhoto: filename, backgroundPhotoCropped: cropName },
        });
        // @ts-ignore
        openNotif({ type: "success", message: "Background saved successfully", key: "notifEditBg" });
      } catch(e){
        notifFailedSaveBg();
      } finally {
        const urlCrop = storage.getFileView(BUCKET_ID, cropName);
        const urlOriginal = storage.getFileView(BUCKET_ID, filename);
        console.log('urlCrop: ', urlCrop);
        console.log('urlOriginal: ', urlOriginal);
        if(urlCrop?.href){
          setCover(urlCrop.href);
        }
        if(urlOriginal?.href){
          setCoverDefault(urlOriginal.href);
        }
        setLoadingSaveBgCover(false);
      }
    }
  }

  const onDeleteCover = (closeConfirm: any) => {
    setLoadingSaveBgCover(true);
    functions.createExecution(DeleteAvatarBackground, `{"candidateId":"${logId}","delete":"background"}`)
      .then((res: any) => {
        const fixRes = res?.response ? JSON.parse(res.response) : {};
        console.log('res: ', res);
        console.log('fixRes: ', fixRes);
        if(fixRes.success){
          setCover(INITIAL_BG);
          closeConfirm();
        }else{
          notifFailedSaveBg();
        }
      })
      .catch(() => {
        notifFailedSaveBg();
      })
      .finally(() => {
        setLoadingSaveBgCover(false);
      });
  }

  const onSaveAvatar = (file: any) => {
    console.log('Hit API to save avatar & avatarCropped here');
    // console.log('onSaveAvatar file: ', file);
    setAvatar(window.URL.createObjectURL(file)); // file
  }

  const viewPhotoAvatar = (close: any) => {
    close(); // Close menu
    setOpenModalView(true);
  }

  const onCloseModalView = () => {
    setOpenModalView(false);
  }

  const doDeleteAvatar = (close: any, openConfirmDelete: any) => {
    close(); // Close menu
    openConfirmDelete(); // Open confirm
  }

  const onDeleteAvatar = (closeConfirm: any) => {
    setTimeout(() => {
      setAvatar(null);
      closeConfirm(); // Close confirm
    }, 1500);
  }

  const doChangePositionAvatar = (close: any, openModalCrop: any) => {
    close(); // Close menu
    openModalCrop(); // Open dialog
  }

  const onOpenModal = () => {
    setModalEdit(true);
  }

  const onCloseModal = () => {
    setModalEdit(false);
  }

  const onSaveWorkExperience = (val: any) => {
    setListWorkExperience([ val, ...listWorkExperience ]);
  }

  const onDeleteWorkExperience = (val: any, closeConfirm: any, onCloseModal: any) => {
    setListWorkExperience(listWorkExperience.filter((f: any) => f.id !== val.id));
    closeConfirm();
    onCloseModal();
  }

  const onSaveEducation = (val: any) => {
    setListEducation([ val, ...listEducation ]);
  }

  const onDeleteEducation = (val: any, closeConfirm: any, onCloseModal: any) => {
    setListEducation(listEducation.filter((f: any) => f.id !== val.id));
    closeConfirm();
    onCloseModal();
  }

  const onSaveProfile = (data: any) => {
    if(data){
      setModalEdit(false);
    }
  }

  return (
    <LayoutLogged>
      {!isLoading && !isLoadingCurrentUser && (
        <FormProfile
          open={modalEdit}
          documentId={documentId}
          values={{ candidateId, fullName, accountName, headLine, bio, country, province, city }}
          provinceValue={provinceValue}
          cityValue={cityValue}
          onCloseModal={onCloseModal}
          onSuccess={onSaveProfile}
          onChangeProvince={setProvinceValue}
          onChangeCity={setCityValue}
        />
      )}

      <Container className="pb-7 md:pt-7 max-md:px-0">
        <Grid container spacing={3} justifyContent="center">
          <Grid item lg={9} xs={12} className="flex flex-col gap-6">
            {isLoading || isLoadingCurrentUser ?
              <CardUser />
              :
              <Card variant="outlined" className="max-md:rounded-none">
                <Cover
                  hide={!isLoggedInUser}
                  disabled={isLoading || loadingSaveBgCover}
                  src={cover}
                  cropSrc={coverDefault}
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
                        onDelete={onDeleteAvatar}
                      >
                        {({ onChangeFile, openModalCrop, openConfirmDelete, disabled }: any) => (
                          isLoggedInUser && (
                            avatar ?
                              <Dropdown
                                {...(isFullScreen ? menuCenter : menuLeft)}
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
                                    <input ref={refFile} onChange={onChangeFile} disabled={disabled} type="file" accept={ACCEPT_IMG} hidden />
                                  </MenuItem>,
                                  <MenuItem key="c" onClick={() => doChangePositionAvatar(close, openModalCrop)}>
                                    <MoveIcon width={18} height={18} className="ml-1 mr-3" />Change Position
                                  </MenuItem>,
                                  <hr key="h" className="my-2" />,
                                  <MenuItem key="d" onClick={() => doDeleteAvatar(close, openConfirmDelete)}>
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
                                <input ref={refFile} onChange={onChangeFile} disabled={disabled} type="file" accept={ACCEPT_IMG} hidden />
                              </Button>
                          )
                        )}
                      </AvatarSetup>
                      
                      <h4 className="mb-0 mt-3 font-semibold text-gray-800">{fullName}</h4>
                      <h6 className="mb-1 text-w-warning">{headLine}</h6>
                      <address className="not-italic text-sm text-gray-500">
                        <RoomTwoToneIcon sx={{ fontSize: 16 }} className="align-middle" /> {[city, province, country].join(', ')}
                      </address>
                    </Grid>
                    
                    <Grid item lg={3} xs={12} className="lg:text-right max-md:flex max-md:flex-col items-center">
                      {accountName && (
                        <Button
                          color="secondary"
                          className="mb-4 bg-gray-100 text-gray-500 hover:bg-w-primary hover:text-white"
                        >
                          <WerkLogo className="mr-1" />
                          werk.id/@{accountName}
                        </Button>
                      )}

                      {isLoggedInUser && (
                        <Button
                          disabled={isLoadingCurrentUser}
                          onClick={onOpenModal}
                          className="min-w-0"
                        >
                          <EditTwoToneIcon fontSize="small" className="mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </Grid>
                  </Grid>

                  {bio && (
                    <p className="mt-5 text-sm text-gray-500">
                      {bio}
                    </p>
                  )}
                  <div className="text-xs text-gray-400 mt-5">
                    Joined Werk: {$createdAt && <Time value={$createdAt} dateTime={$createdAt} className="font-medium" />}
                  </div>
                </CardContent>
              </Card>
            }

            {isLoading || isLoadingCurrentUser ?
              [1, 2, 3, 4].map((v: number) => <CardSection key={v} contentSize={200} headerClass="py-3" />)
              :
              <>
                <WorkExperience
                  editable={isLoggedInUser}
                  list={listWorkExperience}
                  // list={[
                  //   { 
                  //     id: 1, jobPosition: 'jobPosition', joinDate: 'joinDate', endDate: '', 
                  //     companyName: 'companyName', country: 'country', 
                  //     province: 'province', city: 'city', companyIndustry: 'companyIndustry', 
                  //     workType: 'workType',
                  //     commitmentType: 'commitmentType',
                  //   }
                  // ]}
                  onSave={onSaveWorkExperience}
                  onDelete={onDeleteWorkExperience}
                />

                <Education
                  editable={isLoggedInUser}
                  // list={[
                  //   { id: 1, educationTitle: "Magister of Science", startDate: "2019-07-11", endDate: "2021-01-01", schoolName: "Harvard University" },
                  //   { id: 2, educationTitle: "Bachelor of Arts", startDate: "2019-07-11", endDate: "2021-01-01", schoolName: "Standford University" },
                  //   { id: 3, educationTitle: "Associate in Arts and Sciences, AAS-DTA", startDate: "2019-07-11", endDate: "2021-01-01", schoolName: "Bellevue College" },
                  //   { id: 4, educationTitle: "Magister of Science", startDate: "2019-07-11", endDate: "2021-01-01", schoolName: "Harvard University" },
                  // ]}
                  list={listEducation}
                  onSave={onSaveEducation}
                  onDelete={onDeleteEducation}
                />

                <HardSkill
                  editable={isLoggedInUser}
                  list={[]}
                  // list={[
                  //   { id: 1, name: 'Adobe After Effect' },
                  //   { id: 2, name: 'Adobe XD' },
                  // ]}
                />

                <SoftSkill
                  editable={isLoggedInUser}
                  // list={[]}
                />
              </>
            }
          </Grid>
          
          <Grid item lg={3} xs={12} className="flex flex-col gap-6">
            {isLoading || isLoadingCurrentUser ?
              [1, 2, 3].map((v: number) => <CardSection key={v} contentSize={90} headerClass="py-1" />)
              :
              <>
                {!isLoggedInUser && (
                  <Button fullWidth size="large" variant="contained">Send a Message</Button>
                )}

                <Card variant="outlined" className="max-md:rounded-none w-card">
                  <CardHeader
                    avatar={<WorkTwoToneIcon />}
                    titleTypographyProps={{
                      className: "font-medium",
                    }}
                    title="Work Availability"
                    action={
                      isLoggedInUser && <Switch defaultChecked />
                    }
                    className="py-2 border-bottom"
                  />
                  <List dense component="div">
                    {['Internship', 'Freelance Hourly Based'].map((item: any) =>
                      <ListItem
                        key={item}
                        disablePadding
                        component={isLoggedInUser ? "label" : "div"}
                        secondaryAction={
                          isLoggedInUser ?
                            <Checkbox
                              size="small"
                              edge="end"
                              // onChange={handleToggle(value)}
                              // checked={checked.indexOf(value) !== -1}
                              // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            :
                            <CheckCircleTwoToneIcon fontSize="small" color="success" />
                        }
                      >
                        {isLoggedInUser ?
                          <ListItemButton className="px-5">
                            <ListItemText primary={item} />
                          </ListItemButton>
                          :
                          <ListItemText primary={item} className="py-1 px-5" />
                        }
                      </ListItem>
                    )}
                  </List>
                  {isLoggedInUser && (
                    <CardActions className="justify-end border-top py-1">
                      <Button size="small" color="inherit">
                        <HelpTwoToneIcon sx={{ fontSize: 15 }} className="mr-1" />
                        Learn more
                      </Button>
                    </CardActions>
                  )}
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
                  <List dense component="div">
                    {['Onsite Work', 'Remote Work', 'Hybrid'].map((item: any) =>
                      <ListItem
                        key={item}
                        disablePadding
                        component={isLoggedInUser ? "label" : "div"}
                        secondaryAction={
                          isLoggedInUser ?
                            <Checkbox
                              size="small"
                              edge="end"
                            />
                            :
                            <CheckCircleTwoToneIcon fontSize="small" color="success" />
                        }
                      >
                        {isLoggedInUser ?
                          <ListItemButton className="px-5">
                            <ListItemText primary={item} />
                          </ListItemButton>
                          :
                          <ListItemText primary={item} className="py-1 px-5" />
                        }
                      </ListItem>
                    )}
                  </List>
                  {isLoggedInUser && (
                    <CardActions className="justify-end border-top py-1">
                      <Button size="small" color="inherit">
                        <HelpTwoToneIcon sx={{ fontSize: 15 }} className="mr-1" />
                        Learn more
                      </Button>
                    </CardActions>
                  )}
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
                  <List dense component="div">
                    {(isLoggedInUser ? ['Phone Number', 'Website', 'Social Media'] : ['+6282177189201', 'https://johndoe.com']).map((item: any) =>
                      <ListItem
                        key={item}
                        disablePadding
                      >
                        {isLoggedInUser ?
                          <ListItemButton className="px-4 text-blue-700">
                            <AddTwoToneIcon fontSize="small" className="mr-1" />
                            <ListItemText primary={item} />
                          </ListItemButton>
                          :
                          <ListItemText primary={item} className="px-5" />
                        }
                      </ListItem>
                    )}
                  </List>
                </Card>
              </>
            }
          </Grid>
        </Grid>
      </Container>
    </LayoutLogged>
  );
}

export default Profile;
