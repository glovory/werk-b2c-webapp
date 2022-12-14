// When using TypeScript 4.x and above
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme, ThemeOptions } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
// import { darkPalette } from "./palette/darkPalette";
import { typography } from "./typography";

const commonThemeProperties: ThemeOptions = {
  shape: {
    borderRadius: 8, // 6
  },
  typography: {
    ...typography,
  },
};

export const LightTheme = createTheme({
  ...commonThemeProperties,
  palette: lightPalette,
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))",
        },
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     h5: {
    //       fontWeight: 800,
    //       lineHeight: "2rem",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          // backgroundColor: 'red',
        },
      },
    },
  },
});

// export const DarkTheme = createTheme({
//   ...commonThemeProperties,
//   palette: darkPalette,
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))",
//         },
//       },
//     },
//     MuiAppBar: {
//       defaultProps: {
//         color: "transparent",
//       },
//     },
//     MuiTypography: {
//       styleOverrides: {
//         h5: {
//           fontWeight: 800,
//           lineHeight: "2rem",
//         },
//       },
//     },
//   },
// });

// export { LightTheme, DarkTheme };
