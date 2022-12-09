import { useState } from 'react'; // , useEffect
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';
import FormCheck from 'react-bootstrap//FormCheck';
import Spinner from 'react-bootstrap/Spinner';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import { useForm } from 'react-hook-form';
// import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../../components/form/Form';

interface Props {
  onSubmit?: Function | undefined,
  onNextStep?: Function | undefined,
  onBackStep?: Function | undefined,
  values?: Object | any,
  skillType?: string,
}

// export interface FormSkillsInputs {
//   skills?: Array | any
//   // join_date: string
// }

const DUMMY_SKILLS = [
  { id: 1, name: 'Microsoft Office' },
  { id: 2, name: 'Microsoft Excel' },
  { id: 3, name: 'Microsoft Power Point' },
  { id: 4, name: 'Microsoft Paint' },
  { id: 5, name: 'Adobe Photoshop' },
  { id: 6, name: 'Adobe Illustrator' },
  { id: 7, name: 'Adobe After Effect' },
  { id: 8, name: 'Adobe XD' },
  { id: 9, name: 'Adobe Lightroom' },
  { id: 10, name: 'Adobe Premiere' },
];

export default function FormSkills({
  onSubmit,
  onNextStep,
  onBackStep,
  values = [], // {}
  skillType,
}: Props){
  // // , defaultValues, getValues, setValue, register
  // const { reset, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSkillsInputs>({
  //   resolver: yupResolver(yup.object({
  //     skills: yup.string().trim().required('Job Position is required.'),
  //     // join_date: yup.string().trim().required("Join Date is required and can't be empty."),
  //   }).required())
  // });

  // const { reset, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSkillsInputs>();

  const [searchValue, setSearchValue] = useState<string>("");
  const [listSkill, setListSkill] = useState<any>([]);
  // const [selectedSkill, setSelectedSkill] = useState<any>([]);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  // effect runs when fetch state is updated
  // useEffect(() => {
  //   // reset form with fetch data
  //   reset(values);
  // }, [values]);

  const onSearchSkills = (e: any) => {
    const val = e.target.value;
    setSearchValue(val);
    setListSkill(DUMMY_SKILLS.filter(f => f.name.toLowerCase().includes(val.toLowerCase())));
  }

  const onClearSearch = () => {
    setSearchValue("");
    setListSkill([]);
  }

  const onCheckSkill = (e: any, id: string) => {
    setListSkill(listSkill.map((val: any) => (val.id === id ? { ...val, checked: e.target.checked } : val) ));
  }

  const goNextStep = () => {
    if(listSkill.find((f: any) => f.checked)){
      setNextStep(true);
      onNextStep?.();
    }
  }

  const goBack = () => { 
    setNextStep(false);
    onBackStep?.();
  }

  const getSelectedSkills = () => listSkill.filter((f: any) => f.checked);

  // const onSave = (data: FormSkillsInputs) => {
  //   // console.log('data: ', data);
  //   return new Promise((resolve: any) => {
  //     setTimeout(() => {
  //       onSubmit?.(data);
  //       resolve();
  //     }, 1e3);
  //   });
  // }

  const onSave = (e: any) => {
    e.preventDefault();
    setLoadingSave(true);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        onSubmit?.(getSelectedSkills());
        resolve();
        setLoadingSave(false);
      }, 1e3);
    });
  }

  const onChangeDuration = (e: any, item: any) => {
    const duration = e.target.value;
    // console.log('onChangeDuration duration: ', duration);
    // console.log('onChangeDuration item: ', item);
    setListSkill(listSkill.map((val: any) => (val.id === item.id ? { ...val, duration } : val) ));
  }

  return (
    <Form
      // noValidate={false} // OPTION
      disabled={loadingSave} // isSubmitting
      // onSubmit={handleSubmit(onSave)}
      onSubmit={onSave}
    >
      {nextStep ?
        <>
          <h5 className="text-capitalize">{getSelectedSkills().length} {skillType} Skills Selected</h5>
          <p>Select years of experience of your {skillType} skills.</p>
          <hr className="my-7 border-secondary" />
        </>
        :
        <>
          <p>You can add up to 25 {skillType} skills. This will allow recruiters to better understand your suitability for the job.</p>
          <label className="input-group mb-3">
            <FormControl
              type="text"
              placeholder={`Search ${skillType} skill`}
              className="form-control-solid"
              value={searchValue}
              onChange={onSearchSkills}
            />
            {!!searchValue.length &&
              <Button as="div" onClick={onClearSearch} variant="light" className="px-2">
                <CloseTwoToneIcon />
              </Button>
            }
          </label>
        </>
      }

      {nextStep && !!getSelectedSkills().length ?
        getSelectedSkills().map((item: any, idx: number) =>
          <div key={item.id || idx}>
            <label htmlFor={item.id} className="required form-label fw-semibold">{item.name}</label>
            <div className="d-flex">
              <FormSelect
                id={item.id}
                value={item.duration}
                onChange={(e: any) => onChangeDuration(e, item)}
              >
                <option value="">Select years of experience</option>
                {['0-2', '2-5', '>5'].map((val: any) => <option key={val} value={val}>{val} years experience</option>)}
              </FormSelect>
              <Button variant="light" className="px-2 ms-1">
                <DeleteTwoToneIcon color="error" />
              </Button>
            </div>
            <hr className="my-7 border-secondary" />
          </div>
        )
        :
        !!listSkill.length && (
          <div className="row">
            {listSkill.map((item: any, idx: number) => 
              <div key={item.id || idx} className="col-12 col-md-6">
                <FormCheck
                  // {...register("isCurrentWork")}
                  type="checkbox"
                  id={'s_' + item.id}
                  label={item.name}
                  className="mt-4"
                  checked={!!item.checked}
                  onChange={(e: any) => onCheckSkill(e, item.id)}
                />
              </div>
            )}
          </div>
        )
      }
      
      <hr className="my-5 border-secondary" />

      <div className="text-end py-4 position-sticky bottom-0 z-10 bg-white border-top mt-4 mb-n6">
        {nextStep ?
          <div className="d-flex">
            <Button
              disabled={loadingSave} // isSubmitting
              variant="link"
              onClick={goBack}
            >
              <ArrowBackTwoToneIcon /> Back
            </Button>
            <Button
              disabled={loadingSave} // isSubmitting
              type="submit"
              className="px-17 ms-auto"
            >
              {/* isSubmitting */}
              {loadingSave && <Spinner size="sm" className="me-2" />}
              Save
            </Button>
          </div>
          :
          <Button
            className="px-17"
            onClick={goNextStep}
          >
            Continue
          </Button>
        }
      </div>
    </Form>
  );
}

/* <label htmlFor="education_name" className="required form-label fw-semibold">School or University Name</label>
  <FormControl
    {...register("education_name")}
    type="text"
    required
    disabled={isSubmitting}
    isInvalid={!!errors.education_name}
    id="education_name"
    placeholder="Enter school or university name"
    className="form-control-solid"
  />
  {errors.education_name && <div className="invalid-feedback">{errors.education_name.message}</div>} */
