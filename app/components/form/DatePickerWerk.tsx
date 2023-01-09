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
 * - mountOnOpen: boolean, default = false (for render first open, next toggle hide)
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
      open = false,
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
      onClose,
      ...etc
    }: any, // DatePickerWerkProps
    ref
  ) => {
    const [val, setVal] = useState<DateValueType>(value);
    const [show, setShow] = useState<boolean>(open);
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const doOpen = () => {
      (mountOnOpen && !firstRender) && setFirstRender(true);
      setShow(true);
      onOpen?.();
    }

    const doClose = () => {
      setShow(false);
      onClose?.();
    }

    const change = (value: DateValueType, keyboardInputValue: string) => {
      setVal(value);
      onChange?.(value, keyboardInputValue);
    }

    return (
      <DatePicker
        {...etc}
        ref={ref}
        open={show}
        onOpen={doOpen}
        onClose={doClose}
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
