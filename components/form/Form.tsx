import { forwardRef } from "react"; // React, ReactNode, 
import { Cx } from '../../utils/dom';

// interface FormProps {
//   children?: React.ReactNode, // any, // ReactNode
//   noValidate?: boolean,
//   disabled?: boolean,
//   loading?: boolean,
//   fieldsetClass?: string,
// }

// export interface FormProps
//   extends React.FormHTMLAttributes<HTMLFormElement>,
//   {
//     children?: any; // ReactNode
//     noValidate?: boolean;
//     disabled?: boolean;
//     loading?: boolean;
//     fieldsetClass?: string;
//   }

const Form = forwardRef<HTMLFormElement, any>(
  (
    {
      className,
      disabled,
      validated,
      fieldsetClass,
      noValidate = true,
      // prepend,
      // append,
      children,
      ...etc
    }: any, // FormProps
    ref
  ) => {
    return (
      <form
        {...etc}
        ref={ref}
        noValidate={noValidate}
        className={Cx(className, { 'was-validated': validated, disabled })}
      >
        {/* {prepend} */}

        <fieldset
          className={fieldsetClass}
          disabled={disabled}
        >
          {children}
        </fieldset>

        {/* {append} */}
      </form>
    );
  }
);

export default Form;
