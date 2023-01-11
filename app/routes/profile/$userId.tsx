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
import { useGetIdentity, useList, useUpdate, useNotification, useNavigation } from "@pankod/refine-core"; // , useIsExistAuthentication
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
  const isMediaQuery = useMediaQuery(theme.breakpoints.down('md'));
  const { open: openNotif } = useNotification(); // , close: closeNotif
  const { mutate } = useUpdate();
  const { replace } = useNavigation(); // push | replace
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
  
  const [cover, setCover] = useState<any>(INITIAL_BG);
  const [coverDefault, setCoverDefault] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [avatarDefault, setAvatarDefault] = useState<any>();
  const [loadingAvatar, setLoadingAvatar] = useState<any>(true);
  const [loadingSaveBgCover, setLoadingSaveBgCover] = useState<any>(false);
  const [provinceValue, setProvinceValue] = useState<any>(null);
  const [cityValue, setCityValue] = useState<any>(null);
  const [openModalView, setOpenModalView] = useState<boolean>(false);
  const [listEducation, setListEducation] = useState<any>([]);

  useEffect(() => {
    if(!isLoadingCurrentUser){
      if(!accountName){
        return;
      }
      if(province && city){
        setProvinceValue(province);
        setCityValue(city);
      }
      // Avatar
      setAvatar(avatarCropped ? storage.getFileView(BUCKET_ID, avatarCropped)?.href : null);
      setAvatarDefault(avatarVal ? storage.getFileView(BUCKET_ID, avatarVal)?.href : null);
      // Background
      setCover(backgroundPhotoCropped ? storage.getFileView(BUCKET_ID, backgroundPhotoCropped)?.href : INITIAL_BG);
      setCoverDefault(backgroundPhoto ? storage.getFileView(BUCKET_ID, backgroundPhoto)?.href : null);
  
      setLoadingAvatar(false);
    }
  }, [isLoadingCurrentUser, accountName, province, city, avatarVal, avatarCropped, backgroundPhoto, backgroundPhotoCropped]);

  const notifFailedDeleteImage = (msg: string, type: string) => { // @ts-ignore
    openNotif({ type: "error", message: msg, key: "notifErrDel" + type });
  }

  const onSaveCoverOrAvatar = async (crop: any, original: any, type: string, resetCrop?: any) => {
    if(candidateId && documentId){
      const isAvatar = type === 'avatar';
      const filename = (isAvatar ? ''  : 'bg_') + candidateId;
      const cropName = filename + '_cropped';
      isAvatar ? setLoadingAvatar(true) : setLoadingSaveBgCover(true);
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
          values: isAvatar ? { avatar: filename, avatarCropped: cropName } : { backgroundPhoto: filename, backgroundPhotoCropped: cropName },
          errorNotification: false,
          successNotification: false,
        });

        if(isAvatar){
          replace(`/process/profile-update?u=${params.userId}`);
        }else{
          setCover(null);
          setCoverDefault(null);
          setTimeout(() => {
            setCover(storage.getFileView(BUCKET_ID, cropName)?.href);
            setCoverDefault(storage.getFileView(BUCKET_ID, filename)?.href);
            resetCrop?.();
          }, 9);
        }
        // @ts-ignore
        openNotif({
          type: "success",
          key: "notifEdit" + type,
          message: isAvatar ? "Avatar saved successfully" : "Background saved successfully"
        });
      } catch(e){ // @ts-ignore
        openNotif({
          type: "error",
          key: "notifEdit" + type,
          message: isAvatar ? "Failed to save Avatar" : "Failed to save Background"
        });
      } finally {
        isAvatar ? setLoadingAvatar(false) : setLoadingSaveBgCover(false);
      }
    }
  }

  const onDeleteCoverOrAvatar = (closeConfirm: any, type: string) => {
    const isAvatar = type === 'avatar';
    const notifFailed = () => {
      notifFailedDeleteImage(isAvatar ? "Failed to delete Avatar" : "Failed to delete Background", type);
    }
    isAvatar ? setLoadingAvatar(true) : setLoadingSaveBgCover(true);
    functions.createExecution(DeleteAvatarBackground, `{"candidateId":"${logId}","delete":"${type}"}`)
      .then((res: any) => {
        const fixRes = res?.response ? JSON.parse(res.response) : {};
        if(fixRes.success){
          isAvatar ? replace(`/process/profile-update?u=${params.userId}`) : setCover(INITIAL_BG);
          closeConfirm(); // Close modal
        }else{
          notifFailed();
        }
      })
      .catch(() => {
        notifFailed();
      })
      .finally(() => {
        isAvatar ? setLoadingAvatar(false) : setLoadingSaveBgCover(false);
      });
  }

  const viewPhotoAvatar = (close: any) => {
    close(); // Close menu
    setOpenModalView(true);
  }

  const doDeleteAvatar = (close: any, openConfirmDelete: any) => {
    close(); // Close menu
    openConfirmDelete(); // Open confirm
  }

  const doChangePositionAvatar = (close: any, openModalCrop: any) => {
    close(); // Close menu
    openModalCrop(); // Open dialog
  }

  const onSaveEducation = (val: any) => {
    setListEducation([ val, ...listEducation ]);
  }

  const onDeleteEducation = (val: any, closeConfirm: any, closeModal: any) => {
    setListEducation(listEducation.filter((f: any) => f.id !== val.id));
    closeConfirm();
    closeModal();
  }

  return (
    <LayoutLogged>
      <Container className="pb-7 md:pt-7 max-md:px-0">
        <Grid container spacing={3} justifyContent="center">
          <Grid item lg={9} xs={12} className="flex flex-col gap-6">
            {isLoading || isLoadingCurrentUser ?
              <CardUser />
              :
              accountName ? 
                <Card variant="outlined" className="max-md:rounded-none">
                  <Cover
                    src={cover}
                    cropSrc={coverDefault}
                    editable={isLoggedInUser}
                    disabled={isLoading || loadingSaveBgCover}
                    onSave={(crop, original, resetCrop) => onSaveCoverOrAvatar(crop, original, 'background', resetCrop)}
                    onDelete={(close) => onDeleteCoverOrAvatar(close, "background")}
                  />
                  <CardContent className="max-md:text-center">
                    <Grid container spacing={2}>
                      <Grid item lg={9} xs={12}>
                        <AvatarSetup
                          loading={isLoading || loadingAvatar}
                          disabled={isLoading || loadingAvatar}
                          avatarProps={{ sx: { width: 120, height: 120 } }}
                          iconProps={{ width: 60, height: 60 }}
                          src={avatar}
                          cropSrc={avatarDefault}
                          alt={fullName}
                          className="border-solid border-white max-md:mx-auto w-140 h-140"
                          style={{ marginTop: -80, borderWidth: 10 }}
                          inputRef={refFile}
                          openModalView={openModalView}
                          onCloseModalView={() => setOpenModalView(false)}
                          onSave={(crop, original) => onSaveCoverOrAvatar(crop, original, 'avatar')}
                          onDelete={(close) => onDeleteCoverOrAvatar(close, 'avatar')}
                        >
                          {({ onChangeFile, openModalCrop, openConfirmDelete, disabled }: any) => (
                            isLoggedInUser && (
                              avatar ?
                                <Dropdown
                                  {...(isMediaQuery ? menuCenter : menuLeft)}
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
                          <FormProfile
                            documentId={documentId}
                            values={{ candidateId, fullName, accountName, headLine, bio, country, province, city }}
                            provinceValue={provinceValue}
                            cityValue={cityValue}
                            onChangeProvince={setProvinceValue}
                            onChangeCity={setCityValue}
                          />
                        )}
                      </Grid>
                    </Grid>

                    {bio && <p className="mt-5 text-sm text-gray-500">{bio}</p>}
                    <div className="text-xs text-gray-400 mt-5">
                      Joined Werk: {$createdAt && <Time value={$createdAt} dateTime={$createdAt} className="font-medium" />}
                    </div>
                  </CardContent>
                </Card>
                :
                <h4>Not Found</h4>
            }

            <WorkExperience
              editable={isLoggedInUser}
              candidateId={candidateId}
              loading={isLoading || isLoadingCurrentUser}
            />

            {isLoading || isLoadingCurrentUser ?
              [1, 2, 3].map((v: number) => <CardSection key={v} contentSize={200} headerClass="py-3" />)
              :
              accountName && (
                <>
                  {/* <WorkExperience
                    editable={isLoggedInUser}
                    candidateId={candidateId}
                  /> */}

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
              )
            }
          </Grid>
          
          <Grid item lg={3} xs={12} className="flex flex-col gap-6">
            {isLoading || isLoadingCurrentUser ?
              [1, 2, 3].map((v: number) => <CardSection key={v} contentSize={90} headerClass="py-1" />)
              :
              accountName && (
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
              )
            }
          </Grid>
        </Grid>
      </Container>
    </LayoutLogged>
  );
}

export default Profile;
