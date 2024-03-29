import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import {
  bodyFontFamily,
  borderRadius,
  greenDark,
  greenLight,
  greenMain,
  headingFontFamily,
  headingFontWeight,
  primaryDark,
  primaryLight,
  primaryMain,
  secondaryDark,
  secondaryLight,
  secondaryMain,
  white,
  yellowDark,
  yellowLight,
  yellowMain
} from '../constants/theme'
import muiTypographyOverrides from './overrides/muiTypographyOverrides'

const palette: PaletteOptions = {
  primary: {
    light: primaryLight,
    main: primaryMain,
    dark: primaryDark
  },
  secondary: {
    light: secondaryLight,
    main: secondaryMain,
    dark: secondaryDark
  },
  info: {
    light: yellowLight,
    main: yellowMain,
    dark: yellowDark
  },
  success: {
    light: greenLight,
    main: greenMain,
    dark: greenDark
  },
  background: {
    default: white
  }
}

const typography: TypographyOptions = {
  fontFamily: bodyFontFamily,
  fontSize: 16,
  h1: {
    fontFamily: headingFontFamily,
    fontSize: '3.0625rem',
    fontWeight: headingFontWeight,
    lineHeight: '4rem'
  },
  h2: {
    fontFamily: headingFontFamily,
    fontSize: '2.4375rem',
    fontWeight: headingFontWeight,
    lineHeight: '3rem'
  },
  h3: {
    fontFamily: headingFontFamily,
    fontSize: '1.9375rem',
    fontWeight: headingFontWeight,
    lineHeight: '2.5rem'
  },
  h4: {
    fontFamily: headingFontFamily,
    fontSize: '1.5625rem',
    fontWeight: headingFontWeight,
    lineHeight: '2rem'
  },
  h5: {
    fontFamily: headingFontFamily,
    fontSize: '1.25rem',
    fontWeight: headingFontWeight,
    lineHeight: '1.5rem'
  },
  h6: {
    fontFamily: headingFontFamily,
    fontSize: '1rem',
    fontWeight: headingFontWeight,
    lineHeight: '1.5rem',
    letterSpacing: '0.04em'
  }
}

const theme: Theme = createTheme({
  palette: palette,
  typography: typography,
  shape: {
    borderRadius: borderRadius
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        ...muiTypographyOverrides
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: secondaryMain
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: secondaryMain
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before, &:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${secondaryMain}`
          },
          '&:after': {
            borderBottomColor: secondaryMain
          }
        }
      }
    },
    MuiCollapse: {
      styleOverrides: {
        hidden: {
          display: 'none'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiFormControl-root': {
          '& label': {
            '&.Mui-focused, &.MuiFormLabel-filled': {
              color: secondaryLight
            }
          }
        }
      }
    }
  }
})

export default theme
