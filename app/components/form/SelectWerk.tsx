import { forwardRef, useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select'; // , { SelectChangeEvent }

interface SelectWerkProps extends SelectProps {
  label?: string
  labelId?: string
  mountOnOpen?: boolean
  children?: any
  keepMounted?: boolean
  MenuProps?: any
  onOpen?: () => void
  formControlProps?: any
}

/**
 * ### Docs
 * 
 * - [Select](https://mui.com/material-ui/api/select/)
 * ##
 */
const SelectWerk = forwardRef(
  ({
    label,
    labelId,
    mountOnOpen = true, // Custom for render first open, next toggle hide
    children,
    keepMounted,
    MenuProps,
    onOpen,
    formControlProps,
    ...etc
  }: SelectWerkProps,
  ref
) => {
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const doOpen = () => {
      (mountOnOpen && !firstRender) && setFirstRender(true);
      onOpen?.();
    }

    return (
      <FormControl
        {...formControlProps}
      >
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <Select
          {...etc}
          ref={ref}
          labelId={labelId}
          label={label}
          onOpen={doOpen}
          MenuProps={{
            ...MenuProps,
            keepMounted: keepMounted || firstRender,
          }}
        >
          {children}
        </Select>
      </FormControl>
    );
  }
);

  export default SelectWerk;
