import { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useForm, useFieldArray } from "@pankod/refine-react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
//

interface FormSkillsProps {
  title?: string
  values?: any
  options?: Array<any>
  // loading?: boolean
  onSuccessSave?: (data: any) => void
}

const OPTIONS_EXPERIENCE_LEVEL = [
  'Entry (0-1 year of experience)',
  'Junior (1-2 years of experience)',
  'Intermediate (3-5 years of experience)',
  'Senior (6-10 years of experience)',
  'Master (10++ years of experience)',
];

export default function FormSkills({
  title,
  values,
  options = [],
  // loading,
  onSuccessSave,
}: FormSkillsProps){
  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const {
    refineCore: { formLoading }, // onFinish, 
    control,
    // reset,
    register,
    handleSubmit,
    // setValue,
    // setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues: values,
    resolver: yupResolver(yup.object({
      skill: yup.array(yup.object({
        name: yup.string(),
        experienceLevel: yup.string().when([], {
          is: () => step > 1,
          then: yup.string().required('Required choice for experience level.'),
        }),
      })).min(1, 'Please select at least one hard skill.'),
    }).required())
  });
  // swap, move, prepend, insert
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "skill", // unique name for your Field Array
  });
  const processForm = formLoading || isSubmitting;

  const doSubmit = (data: any) => {
    if(step === 1){
      setStep(2);
      console.log('doSubmit step 1 data: ', data);
      return;
    }

    return new Promise((resolve: any) => {
      setTimeout(() => {
        if(step === 2){
          console.log('doSubmit step 2 data: ', data);
          onSuccessSave?.(data);
        }
        resolve();
      }, 1e3);
    });
  }

  const checkedSkill = (name: string) => {
    return fields.find((f: any) => f.name === name);
  }

  const findIndexChecked = (name: string) => {
    return fields.findIndex((f: any) => f.name === name);
  }

  const onCheckedSkill = (e: any) => {
    const { checked, value } = e.target;
    if(checked){
      append({ name: value });
      errors.skill && clearErrors('skill');
    }else{
      remove(findIndexChecked(value));
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(doSubmit)}
    >
      <fieldset
        disabled={processForm}
        className="min-w-0 p-0 m-0 border-0"
      >
        <div hidden={step !== 1} className="py-4 px-6 text-sm">
          <p>
            You can add up to 25 {title}s. This will allow recruiters to better understand your suitability for the job.
          </p>

          <TextField
            label={'Search ' + title}
            // size="small"
            fullWidth
            type="search"
            id="findSkills"
            autoComplete="findSkills"
            disabled={processForm}
            className="w-input-gray my-5"
          />

          <FormControl variant="standard">
            <FormGroup className="max-h-52 overflow-y-auto flex-row">
              {options.map((item: any) => // , index: number
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      {...(checkedSkill(item) ? register(`skill.${findIndexChecked(item)}.name`) : {} )}
                      // {...register(`skill.${index}.name`)}
                      value={item}
                      checked={!!checkedSkill(item)}
                      onChange={onCheckedSkill}
                      disabled={processForm}
                      size="small"
                    />
                  }
                  label={item}
                  className="w-[calc(50%-5px)]"
                />
              )}
            </FormGroup>
          </FormControl>
          {/* @ts-ignore */}
          {errors?.skill?.message && <p className="text-xs text-w-error mt-2 pl-4">{errors.skill.message}</p>}
        </div>

        {!!fields.length && (
          <div hidden={step !== 2} className="py-4 px-6 text-sm">
            <h6>{fields.length} {title}s Selected</h6>
            <p>Select experience level of your hard skills.</p>
            <hr className="my-6" />
            
            {fields.map((item: any, idx: number) =>
              <Fragment key={item.name}>
                <label htmlFor={item.name} className="font-medium w-required">{item.name}</label>
                <div className="flex justify-between mt-1">
                  <TextField
                    {...register(`skill.${idx}.experienceLevel`)}
                    select
                    SelectProps={{
                      native: true,
                    }} // @ts-ignore
                    // value={errors?.skill?.[idx]?.experienceLevel}
                    // onChange={(e: any) => }
                    fullWidth
                    id={item.name} // @ts-ignore
                    error={!!errors?.skill?.[idx]?.experienceLevel} // @ts-ignore
                    helperText={errors?.skill?.[idx]?.experienceLevel.message}
                  >
                    <option value="">Select experience level</option>
                    {OPTIONS_EXPERIENCE_LEVEL.map((option: any) =>
                      <option key={option} value={option}>{option}</option>
                    )}
                  </TextField>
                  <Button>
                    <DeleteTwoToneIcon color="error" />
                  </Button>
                </div>
                <hr className="my-6" />
              </Fragment>
            )}
          </div>
        )}

        <div className="flex border-top py-3 pr-6 pl-3">
          {step > 1 && (
            <Button onClick={() => setStep(1)} size="large" color="inherit">
              <ArrowBackTwoToneIcon className="mr-2" />Back
            </Button>
          )}
          
          <LoadingButton
            size="large"
            variant="contained"
            loading={processForm}
            type="submit"
            className="ml-auto"
          >
            {step < 2 ? 'Continue' : 'Save'}
          </LoadingButton>
        </div>
      </fieldset>
    </form>
  );
}
