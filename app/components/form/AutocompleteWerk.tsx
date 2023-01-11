import { forwardRef, useState } from "react"; 
import Autocomplete from '@mui/material/Autocomplete'; // , { AutocompleteProps }

// interface AutocompleteWerk {
//   mountOnOpen?: boolean
//   keepMounted?: boolean
//   componentsProps?: any
//   onOpen?: () => void
// }

/**
 * ### Docs
 * 
 * - [Autocomplete](https://mui.com/material-ui/api/autocomplete/)
 * ##
 */
const AutocompleteWerk = forwardRef(
  ({
    mountOnOpen = true, // Custom for render first open, next toggle hide
    keepMounted,
    componentsProps,
    onOpen,
    ...etc
  }: any,
  ref
) => {
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const doOpen = () => {
      (mountOnOpen && !firstRender) && setFirstRender(true);
      onOpen?.();
    }

    return (
      <Autocomplete
        {...etc}
        ref={ref}
        componentsProps={{
          ...componentsProps,
          popper: {
            ...(componentsProps?.popper),
            keepMounted: keepMounted || firstRender,
          },
        }}
        onOpen={doOpen}
      />
    );
  }
);

export default AutocompleteWerk;
