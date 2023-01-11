import { forwardRef, useState } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useSelect } from "@pankod/refine-core"; // useList
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
//
import AutocompleteWerk from '~/components/form/AutocompleteWerk';
import { databases } from '~/utility';
import { DATABASE_ID, MasterIndustries } from '~/config';

let masterIndustry = {};

const InputIndustry = forwardRef(
  (
    {
      field,
      inputRef,
      error,
      helperText,
      placeholder,
      ...etc
    }: any,
    ref
  ) => {
    // const selectOptions = useSelect<any>({
    //   liveMode: "off",
    //   resource: MasterIndustries,
    //   optionLabel: "industryName",
    //   optionValue: "industryName", // industryName | $id
    // });
    const [open, setOpen] = useState<boolean>(false);
    const [selectOptions, setSelectOptions] = useState<any>(masterIndustry); // {}
    const optionsData = selectOptions?.documents || []; // options
    const loading = open && optionsData?.length === 0;

    const getMasterIndustries = () => {
      setOpen(true);
      if(!optionsData.length){
        databases.listDocuments(DATABASE_ID, MasterIndustries)
        .then((res: any) => {
          // console.log('res: ', res);
          masterIndustry = res;
          setSelectOptions(res);
        })
        .catch((e) => {
          console.log('e: ', e);
        })
      }
    }

    return (
      <AutocompleteWerk
        {...etc}
        ref={ref}
        loading={loading}
        open={open}
        options={optionsData.map((item: any) => item.industryName)} // item.label
        onOpen={getMasterIndustries}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option: any, value: any) => option === value} // option.industryName === value.industryName
        // getOptionLabel={(option: any) => option.industryName}
        renderInput={(props: any) => (
          <TextField
            {...props}
            {...field}
            inputRef={inputRef}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            InputProps={{
              ...props.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {props.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    )
  }
);

export default InputIndustry;
