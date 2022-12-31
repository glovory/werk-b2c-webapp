import { useState } from 'react';
import { type MetaFunction } from "@remix-run/node";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Portal from '@mui/base/Portal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//
import ErrorComponent from '~/pages/error/ErrorComponent';
import LayoutLogged from '~/components/LayoutLogged';
import { TabPanel, a11yProps } from '~/components/tabs';
import DialogWerk from '~/components/DialogWerk';

export const meta: MetaFunction = () => ({
  title: "Account Setting | Werk",
});

interface FormDeleteAccountInputs {
  email: string
}

const AccountSetting: React.FC = () => {
  const TABS = ['Privacy Setting', 'Delete Account'];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    refineCore: { onFinish, formLoading },
    // reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDeleteAccountInputs>({
    // refineCoreProps: {
    //   resource: CANDIDATE_PROFILES,
    //   redirect: false,
    // },
    resolver: yupResolver(yup.object({
      email: yup.string().required("Email Address is required.").email('Must be a valid email.'),
    }).required())
  });
  const processForm = formLoading || isSubmitting;
  const [tab, setTab] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [hasDeletedAccount, setHasDeletedAccount] = useState<boolean>(false);
  const [isLoadingRestore, setIsLoadingRestore] = useState<boolean>(false);

  const tabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const onDeleteAccount = (data: any) => {
    console.log('onDeleteAccount data: ', data);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onFinish(data);
        setHasDeletedAccount(true);
        onCloseModal();
        resolve();
      }, 1e3);
    });
  }

  const onRestoreAccount = () => {
    setIsLoadingRestore(true);
    // Xhr here
    setTimeout(() => {
      setHasDeletedAccount(false);
      setIsLoadingRestore(false);
    }, 1e3);
  }

  return (
    <LayoutLogged>
      {({ isLoading, isSuccess }: any) => (
        isLoading || !isSuccess ? 
          <ErrorComponent
            className="py-4"
            code={403}
            title="Forbidden"
            description="Client lacks access rights to content; for example, may require password."
            footer={false}
          />
          :
          <>
            <Container className="py-6">
              <h1 className="h5 mb-4">Account Setting</h1>
              <Grid container spacing={3} justifyContent="center">
                <Grid item lg={3} xs={12}>
                  <Card variant="outlined" className="max-md:rounded-none p-2">
                    <Tabs
                      orientation="vertical"
                      // variant="scrollable"
                      value={tab}
                      onChange={tabChange}
                      aria-label="tab-setting"
                      sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                      {TABS.map((t: string, idx: number) =>
                        <Tab
                          key={t}
                          {...a11yProps(idx)}
                          label={t}
                          className="text-left items-start normal-case font-semibold"
                        />
                      )}
                    </Tabs>
                  </Card>
                </Grid>

                <Grid item lg={9} xs={12}>
                  <TabPanel value={tab} index={0}>
                    <Card variant="outlined" className="max-md:rounded-none">
                      <CardHeader
                        className="border-bottom"
                        title="Privacy Setting"
                        subheader="You can set which user that able to see your content."
                        titleTypographyProps={{
                          className: "text-lg font-medium",
                        }}
                        subheaderTypographyProps={{
                          variant: "body2",
                        }}
                      />

                      <div className="py-6 px-4">
                        <TableContainer>
                          {/* sx={{ minWidth: 650 }} */}
                          <Table size="small" aria-label="table privacy setting">
                            <TableHead>
                              <TableRow className="bg-gray-100">
                                <TableCell className="rounded-l-md border-0"></TableCell>
                                <TableCell width={150} align="center" className="border-0">Company View</TableCell>
                                <TableCell width={200} align="center" className="rounded-r-md border-0">Public User View</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {['Work Experience', 'Education', 'Hard Skill'].map((row) => (
                                <TableRow
                                  key={row}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Switch defaultChecked />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Switch />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </Card>
                  </TabPanel>

                  <TabPanel value={tab} index={1}>
                    <Card variant="outlined" className="max-md:rounded-none">
                      <CardHeader
                        className="border-bottom"
                        title="Delete Account"
                        subheader="Once you delete your account, there is no going back."
                        titleTypographyProps={{
                          className: "text-lg font-medium",
                        }}
                        subheaderTypographyProps={{
                          variant: "body2",
                        }}
                      />

                      <div className="py-6 px-4">
                        {hasDeletedAccount ?
                          <>
                            <p className="mb-5">
                              You have 15 days left to permanently deletion of your account. You can cancel by restoring your account.
                            </p>
                            <LoadingButton
                              onClick={onRestoreAccount}
                              loading={isLoadingRestore}
                              variant="contained"
                              size="large"
                            >
                              Restore Your Account
                            </LoadingButton>
                          </>
                          :
                          <LoadingButton
                            onClick={() => setOpenModal(true)}
                            variant="outlined"
                            size="large"
                            className="border-red-500 hover:border-red-700 hover:bg-red-700 text-red-500 hover:text-white"
                          >
                            Delete Your Account
                          </LoadingButton>
                        }
                      </div>
                    </Card>
                  </TabPanel>
                </Grid>
              </Grid>
            </Container>

            {hasDeletedAccount &&
              <Portal container={document.getElementById('werkPortalPrepend')}>
                <Alert
                  icon={false}
                  variant="filled"
                  severity="error" // error | warning
                  className="justify-center py-0 rounded-none text-xs"
                >
                  You have 15 days left to permanently deletion of your account. You can cancel by <b className="underline">restoring your account</b>.
                </Alert>
              </Portal>
            }

            <DialogWerk
              title="Delete Your Account"
              fullScreen={fullScreen}
              scroll="body"
              open={openModal}
              onClose={processForm ? undefined : onCloseModal}
            >
              <form
                id="formDeleteAccount"
                className="p-5"
                noValidate
                onSubmit={handleSubmit(onDeleteAccount)}
              >
                <p>
                  You are about to start the process of deleting your account. Your data will no longer available on werk.id.
                </p>
                <p className="my-4">
                  To continue to delete your account, please confirm your email address below:
                </p>
                <label htmlFor="email" className="font-semibold">Email Address</label>
                <TextField
                  {...register("email")}
                  error={!!errors.email}
                  fullWidth
                  // @ts-ignore
                  helperText={errors?.email?.message}
                  id="email"
                  type="email"
                  required
                  disabled={processForm}
                  className="w-input-gray mt-2"
                  placeholder="Confirm your email address"
                />
              </form>
              <DialogActions className="px-5 py-4 border-top">
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={processForm}
                  form="formDeleteAccount"
                  type="submit"
                  className="border-red-500 hover:border-red-700 bg-red-500 hover:bg-red-700 text-white"
                >
                  Delete Account
                </LoadingButton>
              </DialogActions>
            </DialogWerk>
          </>
      )}
    </LayoutLogged>
  );
}

export default AccountSetting;
