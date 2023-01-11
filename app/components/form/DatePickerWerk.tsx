import { forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // , DatePickerProps
import { Dayjs } from 'dayjs'; // dayjs, 
//
import { Cx } from '~/utils/dom';

// interface DatePickerWerkProps {
//   value?: any
//   onChange?: (value?: any, keyboardInputValue?: string) => void
//   className?: string
//   id?: string
//   name?: string
//   required?: boolean
//   autoFocus?: boolean
//   autoComplete?: "off" | "on" | "inputname"
//   size?: "medium" | "small" // (Default = medium)
//   color?: "primary" | "secondary" // (Default = primary)
// }

export type DateValueType = Dayjs | null | undefined;

/** 
 * @props custom props
 * - mountOnOpen: boolean, default = true (for render first open, next toggle hide)
 * 
 * ### Docs : 
 * 
 * - [DatePicker](https://mui.com/x/api/date-pickers/date-picker/)
 * - [TextField](https://mui.com/material-ui/api/text-field/)
 * #
*/
const DatePickerWerk = forwardRef(
  (
    {
      value,
      onChange,
      className,
      id,
      name,
      required,
      autoFocus,
      autoComplete,
      size,
      color,
      variant,
      fullWidth,
      error,
      helperText,
      PopperProps,
      keepMounted,
      mountOnOpen = true, // Custom for render first open, next toggle hide
      onOpen,
      ...etc
    }: any, // DatePickerWerkProps
    ref
  ) => {
    const [val, setVal] = useState<DateValueType>(value);
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const doOpen = () => {
      (mountOnOpen && !firstRender) && setFirstRender(true);
      onOpen?.();
    }

    const change = (newValue: DateValueType, keyboardInputValue: string) => {
      setVal(newValue);
      onChange?.(newValue, keyboardInputValue);
    }

    return (
      <DatePicker
        {...etc}
        ref={ref}
        onOpen={doOpen}
        value={val}
        onChange={change}
        className={Cx("w-input-group w-datepicker", className)}
        PopperProps={{
          ...PopperProps,
          keepMounted: keepMounted || firstRender,
        }}
        renderInput={(props) => (
          <TextField
            {...props}
            id={id}
            name={name}
            required={required}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            size={size}
            color={color}
            variant={variant}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
          />
        )}
      />
    );
  }
);

export default DatePickerWerk;
