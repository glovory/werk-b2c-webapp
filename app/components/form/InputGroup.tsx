import { forwardRef } from 'react';
import TextField from '@mui/material/TextField'; // , { TextFieldProps }
import InputAdornment from '@mui/material/InputAdornment'; // , { InputAdornmentProps }
//
import { Cx } from '~/utils/dom';

export interface InputGroupProps {
  className?: string;
  start?: any;
  end?: any;
  error?: any;
  valid?: any;
  FormHelperTextProps?: any;
  InputProps?: any;
}

const InputGroup = forwardRef(
  (
    {
      className,
      start,
      end,
      error,
      valid,
      FormHelperTextProps,
      InputProps,
      ...etc
    }: InputGroupProps,
    ref
) => {
  const sxFormHelperText = FormHelperTextProps?.sx || {};

  const renderAdornment = (props: any, position: string) => {
    if(props){
      const { label, className: adornmentClass, ...rest } = props;
      return (
        <InputAdornment
          {...rest}
          position={position}
          className={Cx(`w-adornment-${position}`, adornmentClass)}
        >
          {label}
        </InputAdornment>
      );
    }
    return null;
  }

  return (
    <TextField
      {...etc}
      ref={ref as any}
      className={Cx("w-input-group", className)}
      error={error}
      FormHelperTextProps={{
        ...FormHelperTextProps,
        sx: error || !valid ? sxFormHelperText : { ...sxFormHelperText, color: '#86bb40', fontWeight: 500 },
      }}
      InputProps={{
        ...InputProps,
        startAdornment: renderAdornment(start, "start"),
        endAdornment: renderAdornment(end, "end"),
      }}
    />
    );
  }
);

export default InputGroup;
