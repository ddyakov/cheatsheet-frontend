import { StyleRules } from '@material-ui/core/styles/withStyles'
import { TypographyClassKey } from '@material-ui/core/Typography'

const upperCaseStyle = 'uppercase'

const muiTypographyOverrides: Partial<StyleRules<TypographyClassKey, {}>> = {
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
