import StepLabel from '@material-ui/core/StepLabel'
import { withStyles } from '@material-ui/core/styles'

const CheatSheetStepLabel = withStyles(({ palette }) => ({
  iconContainer: {
    paddingRight: 16
  },
  label: {
    color: palette.secondary.dark
  }
}))(StepLabel)

export default CheatSheetStepLabel
