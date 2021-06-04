import { ComponentsOverrides } from '@material-ui/core/styles'

const upperCaseStyle = 'uppercase'

const muiTypographyOverrides: ComponentsOverrides['MuiTypography'] = {
  h1: {
    textTransform: upperCaseStyle
  },
  h2: {
    textTransform: upperCaseStyle
  },
  h6: {
    textTransform: upperCaseStyle
  }
}

export default muiTypographyOverrides
