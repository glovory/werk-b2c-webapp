import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog'; // , { DialogProps }
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import CloseIcon from '@mui/icons-material/Close';

import LayoutLogged from '~/components/LayoutLogged';
import FormSetting from '~/components/profile/FormSetting';

const STATES = ['Bali', 'DKI Jakarta', 'East Java', 'Jawa Tengah', 'Jawa Barat', 'Kalimantan Tengah', 'Kalimantan Barat', 'Kalimantan Timur', 'Kalimantan Selatan', 'Kalimantan Utara', 'Madura', 'Yogyakarta'];
const CITIES = ['Jakarta', 'Malang', 'Surabaya'];

const Profile: React.FC = () => {
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
    }
  }

  const onSave = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setModalEdit(false);
    }, 2000);
  }

  const onCloseModal = () => {
    setModalEdit(false);
  }

  return (
    <LayoutLogged>
      <Dialog
        open={modalEdit}
        onClose={onCloseModal}
        scroll="body"
        className="modal-bs"
      >
        <DialogTitle className="py-2 pr-2 flex items-center sticky top-0 z-10 bg-white rounded-t-md border-bottom">
          Edit Profile
          <IconButton onClick={onCloseModal} className="ml-auto" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="mt-3">
          <FormSetting
            // @ts-ignore:next-line
            photo={photo}
            disabled={isSubmitting}
            onChangeFile={onChangeFile}
            onSubmit={onSave}
          >
            <div className="mt-3">
              <Autocomplete
                className="w-input-gray w-multiline"
                disabled={isSubmitting}
                id="states"
                fullWidth
                options={STATES}
                renderInput={(props) => <TextField {...props} placeholder="Select Province/States" />}
              />
              {/* {errors.states && <div className="invalid-feedback">{errors.states.message}</div>} */}
            </div>

            <div className="mt-3">
              <Autocomplete
                className="w-input-gray w-multiline"
                disabled={isSubmitting}
                id="city"
                fullWidth
                options={CITIES}
                renderInput={(props) => <TextField {...props} placeholder="Select City" />}
              />
              {/* {errors.city && <div className="invalid-feedback">{errors.city.message}</div>} */}
            </div>
          </FormSetting>
        </DialogContent>
      </Dialog>

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
                    <Button onClick={() => setModalEdit(true)}>
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
