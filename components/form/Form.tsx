import { forwardRef } from "react";
import { Cx } from '../../utils/dom';

const Form = forwardRef<HTMLFormElement, any>(
  (
    {
      className,
      disabled,
      validated,
      fieldsetClass,
      noValidate = true,
      children,
      ...etc
    }: any,
    ref
  ) => {
    return (
      <form
        {...etc}
        ref={ref}
        noValidate={noValidate}
        className={Cx(className, validated && 'was-validated')}
      >
        <fieldset
          className={fieldsetClass}
          disabled={disabled}
        >
          {children}
        </fieldset>
      </form>
    );
  }
);

export default Form;
