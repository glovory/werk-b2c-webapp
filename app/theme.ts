import { LightTheme } from "@pankod/refine-mui"; // , DarkTheme

const fontFamily = 'Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const light = {
  ...LightTheme,
  typography: {
    ...LightTheme.typography,
    fontFamily,
    body1: {
      ...LightTheme.typography.body1, fontFamily
    },
    body2: {
      ...LightTheme.typography.body2, fontFamily
    },
    button: {
      ...LightTheme.typography.button, fontFamily
    },
    caption: {
      ...LightTheme.typography.caption, fontFamily
    },
    h1: {
      ...LightTheme.typography.h1, fontFamily
    },
    h2: {
      ...LightTheme.typography.h2, fontFamily
    },
    h3: {
      ...LightTheme.typography.h3, fontFamily
    },
    h4: {
      ...LightTheme.typography.h4, fontFamily
    },
    h5: {
      ...LightTheme.typography.h5, fontFamily
    },
    h6: {
      ...LightTheme.typography.h6, fontFamily
    },
    overline: {
      ...LightTheme.typography.overline, fontFamily
    },
    subtitle1: {
      ...LightTheme.typography.subtitle1, fontFamily
    },
    subtitle2: {
      ...LightTheme.typography.subtitle2, fontFamily
    },
  },
  palette: {
    ...LightTheme.palette,
    background: {
      ...LightTheme.palette.background,
      default: '#f5f5f5',
    },
    primary: {
      ...LightTheme.palette.primary,
      main: '#0076b9',
      dark: '#187de4',
      light: '#0a58ca',
    }
  },
  components: {
    ...LightTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  }
}

export {
  fontFamily,
  light,
}