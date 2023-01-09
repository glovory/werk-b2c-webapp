import { PaletteOptions } from "@mui/material";

const contrastText = "#fff";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1234ff", // #0076b9 | Refine = #67be23
    dark: '#0d27db', // #187de4
    light: '#0a58ca',
    contrastText,
  },
  secondary: {
    main: "#2A132E",
    contrastText,
  },
  background: {
    default: "#f8f8fa", // #f5f5f5 | Refine = #f0f0f0
    paper: "#fff", // Refine = #ffffff
  },
  success: {
    main: "#86bb40", // #67be23
    contrastText,
  },
  error: {
    main: "#e92f39", // #fa541c
    contrastText,
  },
  warning: {
    main: "#f37421", // #fa8c16
    contrastText,
  },
  info: {
    main: "#0b82f0",
    contrastText,
  },
  divider: "#e8e9ed", // rgba(0,0,0,0)
  text: {
    primary: "#212529", // Design = #1a224c | Default Refine = #626262 | Bs = #212529
    secondary: "#9f9f9f",
    disabled: "#c1c1c1",
  },
};
