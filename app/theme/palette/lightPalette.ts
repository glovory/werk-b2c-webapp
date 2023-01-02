import { PaletteOptions } from "@mui/material";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1234ff", // #0076b9 | Refine = #67be23
    dark: '#0d27db', // #187de4
    light: '#0a58ca',
    contrastText: "#fff",
  },
  secondary: {
    main: "#2A132E",
    contrastText: "#fff",
  },
  background: {
    default: "#f8f8fa", // #f5f5f5 | Refine = #f0f0f0
    paper: "#fff", // Refine = #ffffff
  },
  success: {
    main: "#67be23",
    contrastText: "#fff",
  },
  error: {
    main: "#fa541c",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#0b82f0",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#626262",
    secondary: "#9f9f9f",
    disabled: "#c1c1c1",
  },
};
