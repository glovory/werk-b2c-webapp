import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import AddIcon from '@mui/icons-material/Add';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//
import DialogWerk from '~/components/DialogWerk';
import incrementId from '~/utils/incrementId';

interface EducationProps {
  list: Array<any>,
  onSave?: (val: any) => void
  onDelete?: (val: any, closeConfirm: any, closeModal: any) => void
}

interface FormEducationInputs {
  educationTitle: string
  startDate: string
  endDate: string
  schoolName: string
}

export default function Education({
  list,
  onSave,
  onDelete,
}: EducationProps){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [itemToEditDelete, setItemToEditDelete] = useState<any>({});
  const {
    refineCore: { onFinish, formLoading },
    reset,
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormEducationInputs>({
    // refineCoreProps: {
    //   resource: CandidateProfiles,
    //   redirect: false,
    // },
    resolver: yupResolver(yup.object({
      educationTitle: yup.string().trim().required("Education Title is required."),
      startDate: yup.string().trim().required("Required choice for year range."), // Start Date is required.
      endDate: yup.string().trim().required('Required choice for year range.'), // End Date is required.
      schoolName: yup.string().trim().required('School or university name is required.').max(100, 'Maximum 100 characters.'),
    }).required())
  });
  const processForm = formLoading || isSubmitting;

  const onOpenModal = () => {
    reset({}); // Reset / clear form
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
    setItemToEditDelete({});
  }

  const doSave = (val: any) => {
    const value = { ...val, id: incrementId() };
    console.log('doSave val: ', val);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        // onFinish(val);
        onSave?.(value);
        onCloseModal();
        resolve();
      }, 500);
    });
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const onClickEdit = (item: any) => {
    // console.log('onClickEdit item: ', item);
    setItemToEditDelete(item);
    setOpenModal(true);
    reset(item);
  }

  const clickDelete = (item: any) => {
    setItemToEditDelete(item);
    setOpenConfirm(true);
  }

  return (
    <Card variant="outlined" className="max-md:rounded-none w-card">
      <CardHeader
        className="py-3 border-bottom"
        avatar={<SchoolTwoToneIcon />}
        title="Education"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        action={
          !!list?.length && (
            <Button onClick={onOpenModal} className="font-bold text-blue-700">
              <AddCircleTwoToneIcon fontSize="small" className="mr-2" />Add Education
            </Button>
          )
        }
      />

      <div className="py-6 px-4">
        {!!list?.length ?
          <div className="flex flex-col gap-5">
            {list.map((item: any) =>
              <section key={item.id} className="flex flex-row items-start">
                <div className="grow pr-3 text-sm">
                  <h6 className="text-gray-700 mb-1">{item.educationTitle}</h6>
                  <p>{item.startDate} - {item.endDate}</p>
                  <p>{item.schoolName}</p>
                </div>
                <IconButton onClick={() => onClickEdit(item)} color="primary" aria-label="edit">
                  <EditTwoToneIcon />
                </IconButton>
              </section>
            )}

            {list.length > 3 &&
              <Button size="large" className="px-6 mx-auto bg-gray-100 text-gray-500">
                View All {list.length} Education
              </Button>
            }
          </div>
          :
          <div className="grid place-items-center gap-4 text-gray-400 text-sm">
            <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
              <SchoolTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
            </p>
            <p className="mb-4">Tell the company about your education.</p>
            <Button onClick={onOpenModal} variant="outlined" size="large" className="min-w-40p max-md:min-w-60p">
              <AddIcon fontSize="small" className="mr-2" />Add Education
            </Button>
          </div>
        }
      </div>

      <DialogWerk
        title="Add Education"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="xs"
        scroll="body"
        open={openModal}
        onClose={processForm ? undefined : onCloseModal}
      >
        <form
          className="p-6"
          noValidate
          onSubmit={handleSubmit(doSave)}
        >
          <fieldset
            disabled={processForm}
            className="min-w-0 p-0 m-0 border-0 text-sm"
          >
            <label htmlFor="educationTitle" className="font-medium w-required">Education Title</label>
            <TextField
              {...register("educationTitle")}
              disabled={processForm}
              error={!!errors.educationTitle}
              // @ts-ignore:next-line
              helperText={errors?.educationTitle?.message}
              id="educationTitle"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="Enter education title"
            />
            <hr className="my-6" />

            <label className="font-medium w-required">Join Date</label>
            <div className="flex flex-row items-center mt-2">
              <TextField
                {...register("startDate")}
                disabled={processForm}
                error={!!errors.startDate}
                id="startDate"
                className="w-input-gray"
                required
                fullWidth
                variant="outlined"
                type="date"
              />
              <b className="p-2">-</b>
              <TextField
                {...register("endDate")}
                disabled={processForm}
                error={!!errors.endDate}
                id="endDate"
                className="w-input-gray"
                required
                fullWidth
                variant="outlined"
                type="date"
              />
            </div>
            {(errors?.startDate?.message || errors?.endDate?.message) && // @ts-ignore:next-line
              <div className="text-xs text-red-500 mt-1 pl-4">{errors?.startDate?.message || errors?.endDate?.message}</div>
            }
            <hr className="my-6" />

            <label htmlFor="schoolName" className="font-medium w-required">School or University Name</label>
            <TextField
              {...register("schoolName")}
              disabled={processForm}
              error={!!errors.schoolName}
              // @ts-ignore:next-line
              helperText={errors?.schoolName?.message}
              id="schoolName"
              className="w-input-gray mt-2"
              required
              fullWidth
              variant="outlined"
              placeholder="Enter school or university name"
            />
            <hr className="my-6" />

            <div className="flex">
              {itemToEditDelete?.educationTitle &&
                <Button onClick={() => clickDelete(itemToEditDelete)} size="large" color="error">
                  <DeleteTwoToneIcon className="mr-1" />Delete
                </Button>
              }
              <LoadingButton
                size="large"
                variant="contained"
                loading={processForm}
                type="submit"
                className="px-16 ml-auto"
              >
                Save
              </LoadingButton>
            </div>
          </fieldset>
        </form>
      </DialogWerk>

      <DialogWerk
        title="Delete Education"
        fullWidth
        maxWidth="sm"
        scroll="body"
        open={openConfirm}
        onClose={processForm ? undefined : closeConfirm}
      >
        <div className="p-6">
          Are you sure want to delete this education?
        </div>
        <DialogActions className="py-3 px-4 border-top">
          <Button
            size="large"
            color="error"
            variant="contained"
            className="px-6"
            onClick={() => onDelete?.(itemToEditDelete, closeConfirm, onCloseModal)}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogWerk>
    </Card>
  );
}
